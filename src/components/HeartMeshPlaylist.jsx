import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, Music, Clock } from 'lucide-react';

export default function HeartMeshPlaylist({
  playlist,
  currentTrack,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
  likesMap,
  onLikeTrack
}) {
  return (
    <div className="relative z-20 w-full max-w-3xl mx-auto px-4 py-4">
      {/* Background SVG Heart Mesh Container */}
      <div className="relative rounded-3xl p-4 sm:p-8 glass-panel shadow-burgundy-glow border border-rosegold-deep/20 overflow-hidden">
        
        {/* Heart Mathematical Waves Contour SVG (Background) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 500 500" className="w-[120%] h-[120%] stroke-rosegold-mid fill-none">
            {/* Mathematical heart parametric curves */}
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
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Orbiting metallic spheres at heart perimeter */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-rosegold-deep via-rosegold-light to-white shadow-[0_0_12px_#f2cbbe] animate-pulse" />
        <div className="absolute top-1/3 -right-2 w-4 h-4 rounded-full bg-gradient-to-tr from-rosegold-dark to-rosegold-light shadow-[0_0_10px_#e5a3b2] opacity-80" />
        <div className="absolute top-1/3 -left-2 w-4 h-4 rounded-full bg-gradient-to-tr from-rosegold-dark to-rosegold-light shadow-[0_0_10px_#e5a3b2] opacity-80" />

        {/* Header inside playlist */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-rosegold-deep/20 text-xs sm:text-sm font-medium tracking-wider text-rosegold-light/70 uppercase">
          <div className="flex items-center space-x-2">
            <Music className="w-4 h-4 text-rosegold-mid" />
            <span>Lista de Canciones Especiales</span>
          </div>
          <div className="flex items-center space-x-1 text-rosegold-deep">
            <Clock className="w-3.5 h-3.5" />
            <span>{playlist.length} Canciones</span>
          </div>
        </div>

        {/* Tracks List */}
        <div className="space-y-3 relative z-10">
          {playlist.map((track, index) => {
            const isActive = currentTrack?.id === track.id;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => onSelectTrack(track)}
                className={`relative rounded-2xl p-3 sm:p-4 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  isActive
                    ? 'glass-burgundy shadow-card-active border-rosegold/40 text-white'
                    : 'bg-obsidian-card/60 hover:bg-obsidian-card hover:border-rosegold-deep/30 border border-transparent text-rosegold-light/80'
                }`}
              >
                {/* Left Section: Cover + Info */}
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                  {/* Track Number / Equalizer */}
                  <div className="w-6 text-center font-mono text-xs sm:text-sm text-rosegold-deep font-semibold">
                    {isActive && isPlaying ? (
                      <div className="flex items-end justify-center space-x-0.5 h-4 w-4 mx-auto">
                        <div className="eq-bar" />
                        <div className="eq-bar" />
                        <div className="eq-bar" />
                        <div className="eq-bar" />
                      </div>
                    ) : (
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    )}
                  </div>

                  {/* Album Cover */}
                  <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-md flex-shrink-0 group">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      {isActive && isPlaying ? (
                        <Pause className="w-5 h-5 text-rosegold-light" />
                      ) : (
                        <Play className="w-5 h-5 text-rosegold-light ml-0.5" />
                      )}
                    </div>
                  </div>

                  {/* Info: Title & Artist */}
                  <div className="min-w-0">
                    <h3 className={`text-sm sm:text-base font-semibold truncate ${
                      isActive ? 'text-rosegold-light text-glow-rosegold' : 'text-rosegold-light'
                    }`}>
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-rosegold-deep/90 truncate font-light mt-0.5">
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Right Section: Likes & Duration */}
                <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
                  {/* Heart / Like Button with Supabase Sync */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLikeTrack(track.id);
                    }}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-obsidian/40 border border-rosegold-deep/30 hover:border-rosegold text-rosegold-mid hover:text-rosegold transition-colors group/btn"
                    title="Dar corazón a esta canción"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rosegold-mid/20 group-hover/btn:fill-rosegold text-rosegold-mid transition-all" />
                    <span className="text-xs font-mono font-medium text-rosegold-light">
                      {likesMap[track.id] || 0}
                    </span>
                  </button>

                  {/* Duration */}
                  <span className="text-xs font-mono text-rosegold-deep/80">
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
