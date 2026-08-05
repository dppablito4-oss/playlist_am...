import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareHeart } from 'lucide-react';
import BackgroundCanvas from './components/BackgroundCanvas';
import GeometricCornerHearts from './components/GeometricCornerHearts';
import Header from './components/Header';
import HeartMeshPlaylist from './components/HeartMeshPlaylist';
import SimpleDedicatedLetter from './components/SimpleDedicatedLetter';
import FloatingPlayer from './components/FloatingPlayer';
import LoveLetterModal from './components/LoveLetterModal';
import TheQuestionModal from './components/TheQuestionModal';
import StateBannerNote from './components/StateBannerNote';
import GraceTimerBanner from './components/GraceTimerBanner';
import InfiniteGratitudeLoop from './components/InfiniteGratitudeLoop';
import { getLikesState, incrementLike, getGlobalWebState, updateGlobalWebState } from './lib/supabase';
import { PLAYLISTS } from './lib/playlistData';

export default function App() {
  // ─── State Machine ──────────────────────────────────────
  // 'INITIAL' | 'YES' | 'TIME' | 'MAYBE' | 'NO' | 'EXPIRED'
  const [currentState, setCurrentState] = useState('INITIAL');

  const activePlaylist = PLAYLISTS[currentState] || PLAYLISTS.INITIAL;
  const playlist = activePlaylist.tracks;

  // ─── Audio & Playback State ─────────────────────────────
  const [currentTrack, setCurrentTrack] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(234);
  const [volume, setVolume] = useState(0.85);
  const [isLooping, setIsLooping] = useState(false);

  // ─── UI State ───────────────────────────────────────────
  const [likesMap, setLikesMap] = useState({});
  const [isLoveLetterOpen, setIsLoveLetterOpen] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  // ─── Refs ───────────────────────────────────────────────
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthTimerRef = useRef(null);

  // ─── 1. Load Initial Web State & Likes ──────────────────
  useEffect(() => {
    getLikesState().then(setLikesMap);

    getGlobalWebState().then((stateData) => {
      const { respuesta } = stateData;
      if (['YES', 'TIME', 'MAYBE', 'NO'].includes(respuesta)) {
        setCurrentState(respuesta);
        if (PLAYLISTS[respuesta]) setCurrentTrack(PLAYLISTS[respuesta].tracks[0]);
      }
    });

    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = volume;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 240);
    const handleEnded = () => handleSkipNext();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // ─── 2. State Transition ─────────────────────────────────
  const handleSelectDecision = async (decision) => {
    setCurrentState(decision);
    stopSynthMelodyLoop();
    await updateGlobalWebState(decision);

    const newPlaylist = PLAYLISTS[decision] || PLAYLISTS.INITIAL;
    const firstTrack = newPlaylist.tracks[0];
    setCurrentTrack(firstTrack);
    setCurrentTime(0);
    setIsPlaying(false);

    setTimeout(() => {
      const audio = audioRef.current;
      if (audio && firstTrack?.audioUrl) {
        audio.src = firstTrack.audioUrl;
        audio.play().then(() => setIsPlaying(true))
          .catch(() => { setIsPlaying(true); startSynthMelodyLoop(); });
      }
    }, 200);
  };

  // ─── Web Audio Synth Fallback ───────────────────────────
  const playRomanticSynthesizer = (freq = 440) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.8);
    } catch (e) {
      console.warn('AudioContext not supported', e);
    }
  };

  const startSynthMelodyLoop = () => {
    if (synthTimerRef.current) clearInterval(synthTimerRef.current);
    const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23];
    let noteIdx = 0;
    synthTimerRef.current = setInterval(() => {
      playRomanticSynthesizer(notes[noteIdx % notes.length]);
      noteIdx++;
      setCurrentTime(prev => (prev >= duration ? 0 : prev + 1));
    }, 1200);
  };

  const stopSynthMelodyLoop = () => {
    if (synthTimerRef.current) { clearInterval(synthTimerRef.current); synthTimerRef.current = null; }
  };

  // ─── Play / Pause ──────────────────────────────────────
  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause(); stopSynthMelodyLoop(); setIsPlaying(false);
    } else {
      if (currentTrack?.audioUrl) {
        if (audio.src !== window.location.origin + currentTrack.audioUrl) audio.src = currentTrack.audioUrl;
        audio.play().then(() => setIsPlaying(true))
          .catch(() => { setIsPlaying(true); startSynthMelodyLoop(); });
      } else { setIsPlaying(true); startSynthMelodyLoop(); }
    }
  };

  // ─── Select Track ──────────────────────────────────────
  const handleSelectTrack = (track) => {
    const audio = audioRef.current;
    setCurrentTrack(track); setCurrentTime(0); stopSynthMelodyLoop();
    if (audio) {
      audio.src = track.audioUrl;
      audio.play().then(() => setIsPlaying(true))
        .catch(() => { setIsPlaying(true); startSynthMelodyLoop(); });
    }
  };

  const handleSkipNext = () => {
    const i = playlist.findIndex(t => t.id === currentTrack?.id);
    
    // Si estamos en el estado NO y es la última canción de la playlist, al terminar se cierra la web (EXPIRED)
    if (currentState === 'NO' && i === playlist.length - 1) {
      setCurrentState('EXPIRED');
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    handleSelectTrack(playlist[(i + 1) % playlist.length]);
  };

  const handleSkipPrevious = () => {
    const i = playlist.findIndex(t => t.id === currentTrack?.id);
    handleSelectTrack(playlist[(i - 1 + playlist.length) % playlist.length]);
  };

  const handleSeek = (t) => {
    setCurrentTime(t);
    if (audioRef.current && !isNaN(t)) { try { audioRef.current.currentTime = t; } catch (e) {} }
  };

  const handleChangeVolume = (v) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleLikeTrack = async (songId) => {
    const c = await incrementLike(songId);
    setLikesMap(prev => ({ ...prev, [songId]: c }));
  };

  // ─── EXPIRED: Infinite Gratitude Loop ──────────────────
  if (currentState === 'EXPIRED') return <InfiniteGratitudeLoop />;

  // ─── Render ────────────────────────────────────────────
  return (
    <div className="min-h-screen relative overflow-hidden bg-obsidian text-rosegold selection:bg-rosegold-dark selection:text-white flex flex-col pb-36">
      <BackgroundCanvas />
      <GeometricCornerHearts />

      <main className="relative z-10 flex-1 flex flex-col items-center">
        {/* 1. Portada Hero Estilo Apple */}
        <Header playlistTitle={currentState !== 'INITIAL' ? activePlaylist.title : null} />

        {/* 2. Mensaje de Despedida o Nota de Estado (si aplica) */}
        {currentState === 'NO' && <GraceTimerBanner />}

        {currentState !== 'INITIAL' && activePlaylist.note && (
          <StateBannerNote
            state={currentState}
            note={activePlaylist.note}
          />
        )}

        {/* 3. MÚSICA DE UNA: Playlist Section Directa */}
        <div className="w-full">
          <HeartMeshPlaylist
            playlist={playlist}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onSelectTrack={handleSelectTrack}
            onTogglePlay={handleTogglePlay}
            likesMap={likesMap}
            onLikeTrack={handleLikeTrack}
          />
        </div>

        {/* 4. DEDICATORIA AL FINAL: Escrito simple */}
        <div className="w-full mt-12">
          <SimpleDedicatedLetter />
        </div>

        {/* 5. Botón "Abrir La Pregunta Final" al pie de la dedicatoria (solo si está en INITIAL o SÍ/TIEMPO/MAYBE) */}
        {currentState !== 'NO' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-6 mb-16"
          >
            <button
              onClick={() => setIsQuestionOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rosegold-dark via-rosegold-mid to-rosegold-light text-obsidian text-xs sm:text-sm font-extrabold tracking-wide flex items-center space-x-2.5 shadow-rose-glow hover:shadow-[0_0_35px_rgba(242,203,190,0.5)] transition-all duration-300 group cursor-pointer"
            >
              <MessageSquareHeart className="w-4 h-4 text-obsidian group-hover:scale-110 transition-transform" />
              <span>Abrir La Pregunta Final</span>
            </button>
          </motion.div>
        )}

      </main>

      {/* Bottom Floating Player */}
      <FloatingPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onSkipNext={handleSkipNext}
        onSkipPrevious={handleSkipPrevious}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        isLooping={isLooping}
        onToggleLoop={() => setIsLooping(!isLooping)}
        volume={volume}
        onChangeVolume={handleChangeVolume}
      />

      <LoveLetterModal isOpen={isLoveLetterOpen} onClose={() => setIsLoveLetterOpen(false)} />
      <TheQuestionModal isOpen={isQuestionOpen} onClose={() => setIsQuestionOpen(false)} onSelectDecision={handleSelectDecision} />
    </div>
  );
}
