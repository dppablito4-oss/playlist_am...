import React, { useState, useEffect, useRef } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import GeometricCornerHearts from './components/GeometricCornerHearts';
import Header from './components/Header';
import HeartMeshPlaylist from './components/HeartMeshPlaylist';
import FloatingPlayer from './components/FloatingPlayer';
import LoveLetterModal from './components/LoveLetterModal';
import TheQuestionModal from './components/TheQuestionModal';
import StateBannerNote from './components/StateBannerNote';
import GraceTimerBanner from './components/GraceTimerBanner';
import InfiniteGratitudeLoop from './components/InfiniteGratitudeLoop';
import { getLikesState, incrementLike, getGlobalWebState, updateGlobalWebState } from './lib/supabase';
import { PLAYLISTS } from './lib/playlistData';

const GRACE_PERIOD_SECONDS = 600; // 10 Minutos

export default function App() {
  // ─── State Machine ──────────────────────────────────────
  // 'INITIAL' | 'YES' | 'TIME' | 'MAYBE' | 'NO' | 'EXPIRED'
  const [currentState, setCurrentState] = useState('INITIAL');
  const [secondsLeft, setSecondsLeft] = useState(GRACE_PERIOD_SECONDS);

  // Active playlist data derived from state
  const activePlaylist = PLAYLISTS[currentState] || PLAYLISTS.INITIAL;
  const playlist = activePlaylist.tracks;

  // ─── Audio & Playback State ─────────────────────────────
  const [currentTrack, setCurrentTrack] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(234);
  const [volume, setVolume] = useState(0.85);
  const [isLooping, setIsLooping] = useState(false);

  // ─── Likes & Modals ─────────────────────────────────────
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
      const { respuesta, fecha_respuesta } = stateData;

      if (respuesta === 'NO' && fecha_respuesta) {
        const respTime = new Date(fecha_respuesta).getTime();
        const now = new Date().getTime();
        const elapsedSeconds = Math.floor((now - respTime) / 1000);

        if (elapsedSeconds >= GRACE_PERIOD_SECONDS) {
          setCurrentState('EXPIRED');
        } else {
          setCurrentState('NO');
          setSecondsLeft(GRACE_PERIOD_SECONDS - elapsedSeconds);
        }
      } else if (['YES', 'TIME', 'MAYBE'].includes(respuesta)) {
        setCurrentState(respuesta);
        if (PLAYLISTS[respuesta]) {
          setCurrentTrack(PLAYLISTS[respuesta].tracks[0]);
        }
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

  // ─── 2. Grace Timer Interval for 'NO' State ────────────
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

  // ─── 3. State Transition on Decision ─────────────────────
  const handleSelectDecision = async (decision) => {
    setCurrentState(decision);
    stopSynthMelodyLoop();

    // Actualizar globalmente en Supabase y localStorage
    await updateGlobalWebState(decision);

    if (decision === 'NO') {
      setSecondsLeft(GRACE_PERIOD_SECONDS);
    }

    // Switch to the new playlist's first track and auto-play
    const newPlaylist = PLAYLISTS[decision] || PLAYLISTS.INITIAL;
    const firstTrack = newPlaylist.tracks[0];
    setCurrentTrack(firstTrack);
    setCurrentTime(0);
    setIsPlaying(false);

    setTimeout(() => {
      const audio = audioRef.current;
      if (audio && firstTrack?.audioUrl) {
        audio.src = firstTrack.audioUrl;
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(true);
          startSynthMelodyLoop();
        });
      }
    }, 200);
  };

  const handleResetQuestion = () => {
    setIsQuestionOpen(true);
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
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  // ─── Play / Pause ──────────────────────────────────────
  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      stopSynthMelodyLoop();
      setIsPlaying(false);
    } else {
      if (currentTrack?.audioUrl) {
        if (audio.src !== window.location.origin + currentTrack.audioUrl) {
          audio.src = currentTrack.audioUrl;
        }
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(true);
          startSynthMelodyLoop();
        });
      } else {
        setIsPlaying(true);
        startSynthMelodyLoop();
      }
    }
  };

  // ─── Select Track ──────────────────────────────────────
  const handleSelectTrack = (track) => {
    const audio = audioRef.current;
    setCurrentTrack(track);
    setCurrentTime(0);
    stopSynthMelodyLoop();

    if (audio) {
      audio.src = track.audioUrl;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(true);
        startSynthMelodyLoop();
      });
    }
  };

  // ─── Skip Next / Previous ─────────────────────────────
  const handleSkipNext = () => {
    const currentIndex = playlist.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    handleSelectTrack(playlist[nextIndex]);
  };

  const handleSkipPrevious = () => {
    const currentIndex = playlist.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    handleSelectTrack(playlist[prevIndex]);
  };

  // ─── Seek ──────────────────────────────────────────────
  const handleSeek = (newTime) => {
    setCurrentTime(newTime);
    if (audioRef.current && !isNaN(newTime)) {
      try { audioRef.current.currentTime = newTime; } catch (e) { /* fallback */ }
    }
  };

  // ─── Volume ────────────────────────────────────────────
  const handleChangeVolume = (newVol) => {
    setVolume(newVol);
    if (audioRef.current) audioRef.current.volume = newVol;
  };

  // ─── Like Track ────────────────────────────────────────
  const handleLikeTrack = async (songId) => {
    const newCount = await incrementLike(songId);
    setLikesMap(prev => ({ ...prev, [songId]: newCount }));
  };

  // ─── 4. IF EXPIRED: Render Infinite Gratitude Loop ────
  if (currentState === 'EXPIRED') {
    return <InfiniteGratitudeLoop />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-obsidian text-rosegold selection:bg-rosegold-dark selection:text-white flex flex-col justify-between pb-32">
      <BackgroundCanvas />
      <GeometricCornerHearts />

      <main className="relative z-10 flex-1 flex flex-col items-center">
        {/* Header: Monogram + Buttons */}
        <Header
          onOpenLoveLetter={() => setIsLoveLetterOpen(true)}
          onOpenQuestion={() => setIsQuestionOpen(true)}
          currentState={currentState}
          playlistTitle={activePlaylist.title}
        />

        {/* Grace Timer Banner (Only if state is 'NO') */}
        {currentState === 'NO' && (
          <GraceTimerBanner secondsLeft={secondsLeft} />
        )}

        {/* State Banner Note (only after a decision) */}
        {currentState !== 'INITIAL' && activePlaylist.note && (
          <StateBannerNote
            state={currentState}
            note={activePlaylist.note}
            onResetQuestion={handleResetQuestion}
          />
        )}

        {/* Heart Mesh Tracklist */}
        <HeartMeshPlaylist
          playlist={playlist}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onSelectTrack={handleSelectTrack}
          onTogglePlay={handleTogglePlay}
          likesMap={likesMap}
          onLikeTrack={handleLikeTrack}
        />
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

      {/* Love Letter Modal */}
      <LoveLetterModal
        isOpen={isLoveLetterOpen}
        onClose={() => setIsLoveLetterOpen(false)}
      />

      {/* The Question Modal */}
      <TheQuestionModal
        isOpen={isQuestionOpen}
        onClose={() => setIsQuestionOpen(false)}
        onSelectDecision={handleSelectDecision}
      />
    </div>
  );
}
