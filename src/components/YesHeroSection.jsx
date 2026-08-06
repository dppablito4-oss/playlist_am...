import React from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles } from 'lucide-react';

export default function YesHeroSection({ onRevealPlaylist, isRevealed }) {
  return (
    <section className="relative z-20 min-h-[80vh] sm:min-h-[85vh] w-full flex flex-col items-center justify-center px-6 py-12 text-center select-none">
      
      {/* Multi-Layer Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none">
        <div className="absolute inset-0 bg-rosegold-deep/12 rounded-full blur-3xl" />
        <div className="absolute inset-10 bg-burgundy-vibrant/10 rounded-full blur-2xl animate-pulse-glow" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center space-y-8">
        
        {/* Monogram S & S */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <span className="font-serif text-display font-bold tracking-tight text-monogram-gradient text-glow-rosegold">
              S
            </span>
            <span className="font-script text-4xl sm:text-5xl text-rosegold-mid/80 mx-1 animate-pulse-glow">
              &
            </span>
            <span className="font-serif text-display font-bold tracking-tight text-monogram-gradient text-glow-rosegold">
              S
            </span>
          </div>

          <div className="relative mt-4 w-full">
            <div className="h-px bg-gradient-to-r from-transparent via-rosegold-mid/40 to-transparent" />
            <div className="absolute inset-0 h-px shimmer-border" />
          </div>
        </motion.div>

        {/* Messages Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-4 px-4"
        >
          {/* Main Message */}
          <h1 className="font-serif text-2xl sm:text-4xl text-rosegold-light text-glow-rosegold font-bold leading-tight">
            Gracias por abrir esta puerta.
          </h1>

          {/* Secondary Text */}
          <p className="font-serif italic text-base sm:text-xl text-rosegold-light/80 max-w-md mx-auto leading-relaxed font-normal">
            "No quiero correr; quiero hacerlo bien, con calma y verdad."
          </p>
        </motion.div>

        {/* Single CTA Button (Hidden or changed to discrete state once revealed) */}
        {!isRevealed ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="pt-4"
          >
            <button
              onClick={onRevealPlaylist}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rosegold-dark via-rosegold-mid to-rosegold-light text-obsidian text-xs sm:text-sm font-extrabold tracking-wider uppercase flex items-center space-x-3 shadow-rose-glow hover:shadow-rose-glow-lg transition-all duration-300 group cursor-pointer min-h-[48px]"
            >
              <Music className="w-4 h-4 text-obsidian group-hover:scale-110 transition-transform" />
              <span>Escuchar nuestra playlist</span>
              <Sparkles className="w-4 h-4 text-obsidian opacity-80" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pt-2 text-xs text-rosegold-deep/70 font-sans tracking-widest uppercase flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rosegold-mid animate-pulse" />
            <span>Playlist activa</span>
          </motion.div>
        )}

      </div>
    </section>
  );
}
