import React, { useState, useEffect, useRef } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import GeometricCornerHearts from './components/GeometricCornerHearts';
import Header from './components/Header';
import NavigationMenu from './components/NavigationMenu';
import HeartMeshPlaylist from './components/HeartMeshPlaylist';
import FloatingPlayer from './components/FloatingPlayer';
import LoveLetterModal from './components/LoveLetterModal';
import TheQuestionModal from './components/TheQuestionModal';
import StateBannerNote from './components/StateBannerNote';
import GraceTimerBanner from './components/GraceTimerBanner';
import InfiniteGratitudeLoop from './components/InfiniteGratitudeLoop';
import { getLikesState, incrementLike, getGlobalWebState, updateGlobalWebState } from './lib/supabase';
import { PLAYLISTS } from './lib/playlistData';

const GRACE_PERIOD_SECONDS = 600; // 10 Minutes

export default function App() {
  // ─── State Machine ──────────────────────────────────────
  const [currentState, setCurrentState] = useState('INITIAL');
  const [secondsLeft, setSecondsLeft] = useState(GRACE_PERIOD_SECONDS);

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
  const playlistRef = useRef(null);

  // ─── 1. Load Initial Web State & Likes ──────────────────
  useEffect(() => {
    getLikesState().then(setLikesMap);

    getGlobalWebState().then((stateData) => {
      const { respuesta, fecha_respuesta } = stateData;

      if (respuesta === 'NO' && fecha_respuesta) {
        const elapsed = Math.floor((Date.now() - new Date(fecha_respuesta).getTime()) / 1000);
        if (elapsed >= GRACE_PERIOD_SECONDS) {
          setCurrentState('EXPIRED');
        } else {
          setCurrentState('NO');
          setSecondsLeft(GRACE_PERIOD_SECONDS - elapsed);
        }
      } else if (['YES', 'TIME', 'MAYBE'].includes(respuesta)) {
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

  // ─── 2. Grace Timer for 'NO' ────────────────────────────
  useEffect(() => {
    if (currentState !== 'NO') return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCurrentState('EXPIRED');
          if (audioRef.current) audioRef.current.pause();
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentState]);

  // ─── 3. State Transition ─────────────────────────────────
  const handleSelectDecision = async (decision) => {
    setCurrentState(decision);
    stopSynthMelodyLoop();
    await updateGlobalWebState(decision);

    if (decision === 'NO') setSecondsLeft(GRACE_PERIOD_SECONDS);

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

  // ─── Navigation Menu Handler ────────────────────────────
  const handleNavSelect = (key) => {
    if (key === 'carta') {
      setIsLoveLetterOpen(true);
    } else if (key === 'canciones') {
      playlistRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (key === 'pregunta') {
      setIsQuestionOpen(true);
    }
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
    <div className="min-h-screen relative overflow-hidden bg-obsidian text-rosegold selection:bg-rosegold-dark selection:text-white flex flex-col pb-32">
      <BackgroundCanvas />
      <GeometricCornerHearts />

      <main className="relative z-10 flex-1 flex flex-col items-center">
        {/* Hero Portada — Apple Style Spacious */}
        <Header playlistTitle={currentState !== 'INITIAL' ? activePlaylist.title : null} />

        {/* Navigation Menu — Spotify Premium Style */}
        <NavigationMenu onSelect={handleNavSelect} />

        {/* Grace Timer Banner (NO state) */}
        {currentState === 'NO' && <GraceTimerBanner secondsLeft={secondsLeft} />}

        {/* State Banner Note */}
        {currentState !== 'INITIAL' && activePlaylist.note && (
          <StateBannerNote
            state={currentState}
            note={activePlaylist.note}
            onResetQuestion={() => setIsQuestionOpen(true)}
          />
        )}

        {/* Playlist Section */}
        <div ref={playlistRef}>
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
      </main>

      {/* Bottom Player */}
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
