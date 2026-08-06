import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Header({ playlistTitle }) {
  return (
    <header className="relative z-20 min-h-[75vh] sm:min-h-[85vh] w-full flex flex-col items-center justify-between px-6 py-12 text-center select-none">
      
      {/* Top Branding Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="pt-4"
      >
        <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-surface text-xs sm:text-sm uppercase tracking-[0.35em] text-rosegold-light/90 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-rosegold-mid animate-pulse-glow" />
          TU PLAYLIST, SALY.
          <Sparkles className="w-3.5 h-3.5 text-rosegold-mid animate-pulse-glow" />
        </span>
      </motion.div>

      {/* Central Hero Block */}
      <div className="my-auto flex flex-col items-center max-w-xl mx-auto space-y-8">
        
        {/* Multi-Layer Glow Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-88 h-88 pointer-events-none">
          <div className="absolute inset-0 bg-rosegold-deep/10 rounded-full blur-3xl" />
          <div className="absolute inset-8 bg-burgundy-vibrant/8 rounded-full blur-2xl" />
        </div>

        {/* Monogram S & S */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative"
        >
          {/* Script accent above monogram */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-script text-2xl sm:text-3xl text-rosegold-mid/80 mb-3"
          >
            Para ti...
          </motion.p>

          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <span className="font-serif text-display font-bold tracking-tight text-monogram-gradient text-glow-rosegold">
              S
            </span>
            <span className="font-script text-4xl sm:text-5xl text-rosegold-mid/70 mx-1 animate-pulse-glow">
              &
            </span>
            <span className="font-serif text-display font-bold tracking-tight text-monogram-gradient text-glow-rosegold">
              S
            </span>
          </div>

          {/* Refined gradient separator */}
          <div className="relative mt-4 w-full">
            <div className="h-px bg-gradient-to-r from-transparent via-rosegold-mid/50 to-transparent" />
            <div className="absolute inset-0 h-px shimmer-border" />
          </div>
        </motion.div>

        {/* Central Quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="px-4"
        >
          <p className="font-serif text-xl sm:text-3xl text-rosegold-light/90 text-glow-rosegold font-normal leading-relaxed italic max-w-lg mx-auto">
            "La música siempre dijo<br className="hidden sm:inline" /> lo que mis silencios callaron."
          </p>
        </motion.div>

        {/* Playlist Badge (if active) */}
        {playlistTitle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="px-5 py-2 rounded-full glass-surface text-[11px] text-rosegold-mid font-sans tracking-widest uppercase flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rosegold-mid animate-pulse" />
            {playlistTitle}
          </motion.div>
        )}

      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="pb-4 flex flex-col items-center space-y-2 cursor-pointer group"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight * 0.75, behavior: 'smooth' });
        }}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-rosegold-deep/80 group-hover:text-rosegold-light transition-colors duration-250 font-light">
          Desliza para comenzar
        </span>
        <ChevronDown className="w-4 h-4 text-rosegold-mid animate-bounce opacity-70 group-hover:opacity-100 transition-opacity" />
      </motion.div>

    </header>
  );
}
