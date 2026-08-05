import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Header({ playlistTitle }) {
  return (
    <header className="relative z-20 min-h-[75vh] sm:min-h-[85vh] w-full flex flex-col items-center justify-between px-6 py-12 text-center select-none">
      
      {/* Top Branding — Visible & Clear */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="pt-4"
      >
        <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-rosegold-light/90 font-semibold flex items-center gap-2 justify-center">
          <Sparkles className="w-3.5 h-3.5 text-rosegold-mid animate-pulse" />
          TU PLAYLIST, SALY.
          <Sparkles className="w-3.5 h-3.5 text-rosegold-mid animate-pulse" />
        </span>
      </motion.div>

      {/* Central Hero Block — Apple Style Minimalist Breathing Room */}
      <div className="my-auto flex flex-col items-center max-w-xl mx-auto space-y-8">
        
        {/* Glow Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rosegold-deep/15 rounded-full blur-3xl pointer-events-none" />

        {/* Monogram S & S */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative"
        >
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <span className="font-serif text-7xl sm:text-9xl font-bold tracking-tight text-monogram-gradient text-glow-rosegold">
              S
            </span>
            <span className="font-serif text-5xl sm:text-7xl font-light text-rosegold-mid opacity-80 italic mx-1">
              &
            </span>
            <span className="font-serif text-7xl sm:text-9xl font-bold tracking-tight text-monogram-gradient text-glow-rosegold">
              S
            </span>
          </div>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-rosegold-light/40 to-transparent mt-3 w-full" />
        </motion.div>

        {/* Central Quote with Spacious Typography */}
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

        {/* Playlist Badge if active */}
        {playlistTitle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="px-4 py-1.5 rounded-full bg-obsidian-card/60 border border-rosegold-deep/20 text-[11px] text-rosegold-mid font-mono tracking-widest uppercase"
          >
            ♫ {playlistTitle}
          </motion.div>
        )}

      </div>

      {/* Bottom Scroll Indicator — Apple-like "↓ Desliza para comenzar" */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="pb-4 flex flex-col items-center space-y-2 cursor-pointer group"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight * 0.75, behavior: 'smooth' });
        }}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-rosegold-deep/80 group-hover:text-rosegold-light transition-colors font-light">
          ↓ Desliza para comenzar
        </span>
        <ChevronDown className="w-4 h-4 text-rosegold-mid animate-bounce opacity-70" />
      </motion.div>

    </header>
  );
}
