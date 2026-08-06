import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Repeat, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function FloatingPlayer({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onSkipNext,
  onSkipPrevious,
  currentTime,
  duration,
  onSeek,
  isLooping,
  onToggleLoop,
  volume,
  onChangeVolume
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [prevVol, setPrevVol] = useState(volume);

  if (!currentTrack) return null;

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === null) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      onChangeVolume(prevVol || 0.8);
    } else {
      setPrevVol(volume);
      setIsMuted(true);
      onChangeVolume(0);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 200 }}
        className="fixed bottom-3 left-3 right-3 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl z-50"
      >
        <div className="glass-burgundy rounded-2xl p-3 sm:p-4 shadow-burgundy-glow border border-rosegold/30 flex flex-col space-y-2">
          
          {/* Top Row: Track Info + Playback Controls */}
          <div className="flex items-center justify-between gap-3">
            
            {/* Left: Track Cover & Details */}
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-lg flex-shrink-0 border border-rosegold/30">
                <img
                  src={currentTrack.cover || currentTrack.coverUrl}
                  alt={currentTrack.title}
                  className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-bold text-rosegold-light text-glow-rosegold truncate flex items-center gap-1.5">
                  <span>{currentTrack.title}</span>
                  {isPlaying && <Sparkles className="w-3 h-3 text-rosegold-mid animate-pulse flex-shrink-0" />}
                </h4>
                <p className="text-xs text-rosegold-deep truncate font-light mt-0.5">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Center: Main Controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Skip Previous */}
              <button
                onClick={onSkipPrevious}
                className="p-1.5 text-rosegold-mid hover:text-rosegold hover:scale-110 transition-transform"
                title="Canción anterior"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>

              {/* Play / Pause Main Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={onTogglePlay}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-rosegold-dark via-rosegold-mid to-rosegold-light text-obsidian flex items-center justify-center shadow-rose-glow"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-obsidian stroke-obsidian" />
                ) : (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-obsidian stroke-obsidian ml-0.5" />
                )}
              </motion.button>

              {/* Skip Next */}
              <button
                onClick={onSkipNext}
                className="p-1.5 text-rosegold-mid hover:text-rosegold hover:scale-110 transition-transform"
                title="Siguiente canción"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>
            </div>

            {/* Right: Loop & Volume Controls */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Repeat Loop */}
              <button
                onClick={onToggleLoop}
                className={`p-1.5 rounded-lg transition-colors ${
                  isLooping
                    ? 'text-rosegold bg-rosegold-dark/40 border border-rosegold/40'
                    : 'text-rosegold-deep hover:text-rosegold-light'
                }`}
                title={isLooping ? 'Bucle activado' : 'Activar bucle'}
              >
                <Repeat className="w-4 h-4" />
              </button>

              {/* Volume */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleToggleMute}
                  className="text-rosegold-mid hover:text-rosegold"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rosegold-deep" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setIsMuted(false);
                    onChangeVolume(parseFloat(e.target.value));
                  }}
                  className="w-16 h-1 accent-rosegold bg-obsidian-card rounded-lg cursor-pointer"
                />
              </div>
            </div>

          </div>

          {/* Bottom Row: Progress Bar & Timers */}
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono text-rosegold-deep/80">
            <span>{formatTime(currentTime)}</span>
            
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newTime = (clickX / rect.width) * (duration || 0);
                onSeek(newTime);
              }}
              className="relative flex-1 h-1.5 bg-obsidian/60 hover:h-2 rounded-full cursor-pointer overflow-hidden transition-all group"
            >
              <div
                className="h-full bg-gradient-to-r from-rosegold-dark via-rosegold-mid to-rosegold-light rounded-full transition-all duration-150 relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#fff] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <span>{formatTime(duration)}</span>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
