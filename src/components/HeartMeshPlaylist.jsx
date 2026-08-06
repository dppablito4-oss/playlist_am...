import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, Music, Clock } from 'lucide-react';

function TrackCover({ track, isActive, isPlaying }) {
  const [imageError, setImageError] = useState(false);
  const coverSrc = track.coverUrl || track.cover;

  return (
    <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-gradient-to-tr from-burgundy-dark via-obsidian-surface to-rosegold-dark/40 flex items-center justify-center border border-rosegold-deep/20">
      {!imageError && coverSrc ? (
        <img
          src={coverSrc}
          alt={track.title}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isActive && isPlaying ? 'scale-105' : 'group-hover:scale-110'
          }`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rosegold-dark/50 to-obsidian-deep text-rosegold-light">
          <Music className="w-5 h-5 text-rosegold-mid" />
        </div>
      )}
      
      <div className={`absolute inset-0 flex items-center justify-center bg-obsidian-deep/50 transition-opacity duration-200 ${
        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        {isActive && isPlaying ? (
          <Pause className="w-5 h-5 text-rosegold-light drop-shadow-lg" />
        ) : (
          <Play className="w-5 h-5 text-rosegold-light ml-0.5 drop-shadow-lg" />
        )}
      </div>
    </div>
  );
}

export default function HeartMeshPlaylist({
  playlist,
  currentTrack,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
  likesMap,
  onLikeTrack
}) {
  const [likedIds, setLikedIds] = useState(new Set());

  const handleLike = (e, trackId) => {
    e.stopPropagation();
    setLikedIds(prev => {
      const next = new Set(prev);
      next.add(trackId);
      return next;
    });
    onLikeTrack(trackId);
    // Reset pop animation after it plays
    setTimeout(() => {
      setLikedIds(prev => {
        const next = new Set(prev);
        next.delete(trackId);
        return next;
      });
    }, 500);
  };

  return (
    <div className="relative z-20 w-full max-w-3xl mx-auto px-4 py-4">
      {/* Main Container */}
      <div className="relative rounded-4xl p-4 sm:p-8 glass-panel shadow-burgundy-glow overflow-hidden">
        
        {/* Heart Math Waves SVG (Background) */}
        <div
          className={`absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
            isPlaying ? 'opacity-25' : 'opacity-10'
          }`}
          style={isPlaying ? { animation: 'heartbeat 1.1s ease-in-out infinite' } : undefined}
        >
          <svg viewBox="0 0 500 500" className="w-[120%] h-[120%] stroke-rosegold-mid fill-none">
            <path
              d="M 250 150 C 250 80, 120 40, 80 140 C 40 240, 250 420, 250 440 C 250 420, 460 240, 420 140 C 380 40, 250 80, 250 150 Z"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="animate-spin-slow"
              style={{ transformOrigin: '250px 250px' }}
            />
            <path
              d="M 250 170 C 250 110, 150 70, 110 160 C 70 240, 250 390, 250 410 C 250 390, 430 240, 390 160 C 350 70, 250 110, 250 170 Z"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Orbiting Glow Spheres */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-tr from-rosegold-deep via-rosegold-light to-champagne shadow-rose-glow animate-pulse-glow" />
        <div className="absolute top-1/3 -right-2 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-rosegold-dark to-rosegold-light shadow-rose-glow opacity-70 animate-float-slow" />
        <div className="absolute top-1/3 -left-2 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-rosegold-dark to-rosegold-light shadow-rose-glow opacity-70 animate-float-slow" style={{ animationDelay: '3s' }} />

        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-rosegold-deep/15 text-xs sm:text-sm font-medium tracking-wider text-rosegold-light/60 uppercase">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg glass-surface flex items-center justify-center">
              <Music className="w-3.5 h-3.5 text-rosegold-mid" />
            </div>
            <span className="font-sans">Canciones Especiales</span>
          </div>
          <div className="flex items-center space-x-1.5 text-rosegold-deep/80">
            <Clock className="w-3 h-3" />
            <span className="font-sans">{playlist.length} canciones</span>
          </div>
        </div>

        {/* Tracks List */}
        <div className="space-y-2.5 relative z-10">
          {playlist.map((track, index) => {
            const isActive = currentTrack?.id === track.id;
            const justLiked = likedIds.has(track.id);

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                whileHover={{ scale: 1.008 }}
                onClick={() => onSelectTrack(track)}
                className={`relative rounded-2xl p-3 sm:p-4 cursor-pointer transition-all duration-250 flex items-center justify-between group ${
                  isActive
                    ? 'glass-burgundy shadow-card-active text-white'
                    : 'bg-obsidian-card/50 hover:bg-obsidian-surface/80 hover:shadow-card-hover border border-transparent hover:border-rosegold-deep/25 text-rosegold-light/80'
                }`}
              >
                {/* Active Track Shimmer Edge */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl shimmer-border pointer-events-none" />
                )}

                {/* Left Section: Number + Cover + Info */}
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                  {/* Track Number / Equalizer */}
                  <div className="w-7 text-center font-sans text-xs sm:text-sm text-rosegold-deep/80 font-medium tabular-nums">
                    {isActive && isPlaying ? (
                      <div className="flex items-end justify-center space-x-0.5 h-5 w-5 mx-auto">
                        <div className="eq-bar" />
                        <div className="eq-bar" />
                        <div className="eq-bar" />
                        <div className="eq-bar" />
                      </div>
                    ) : (
                      <span className={isActive ? 'text-rosegold-light' : ''}>{String(index + 1).padStart(2, '0')}</span>
                    )}
                  </div>

                  {/* Album Cover with Fallback */}
                  <TrackCover track={track} isActive={isActive} isPlaying={isPlaying} />

                  {/* Track Info */}
                  <div className="min-w-0">
                    <h3 className={`text-sm sm:text-base font-semibold truncate transition-colors duration-200 ${
                      isActive ? 'text-rosegold-light text-glow-rosegold' : 'text-rosegold-light group-hover:text-rosegold'
                    }`}>
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-rosegold-deep/80 truncate font-light mt-0.5 font-sans">
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Right Section: Likes & Duration */}
                <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
                  {/* Heart Like Button */}
                  <button
                    onClick={(e) => handleLike(e, track.id)}
                    className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full glass-surface hover:border-rosegold-mid/50 text-rosegold-mid hover:text-rosegold transition-all duration-200 group/btn min-w-[44px] min-h-[44px] justify-center"
                    title="Dar corazón a esta canción"
                  >
                    <Heart className={`w-3.5 h-3.5 transition-all duration-200 ${
                      justLiked ? 'fill-rosegold text-rosegold heart-pop' : 'fill-rosegold-mid/20 group-hover/btn:fill-rosegold-mid/50'
                    }`} />
                    <span className="text-xs font-sans font-medium text-rosegold-light/90 tabular-nums">
                      {likesMap[track.id] || 0}
                    </span>
                  </button>

                  {/* Duration */}
                  <span className="text-xs font-sans text-rosegold-deep/70 tabular-nums hidden sm:inline">
                    {track.duration}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
