import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, BookOpen, MessageSquareHeart } from 'lucide-react';

export default function Header({ onOpenLoveLetter, onOpenQuestion, currentState, playlistTitle }) {
  const isInitial = currentState === 'INITIAL';

  return (
    <header className="relative z-20 pt-8 pb-4 px-4 text-center flex flex-col items-center justify-center">
      {/* Glow aura behind monogram */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rosegold-deep/20 rounded-full blur-3xl pointer-events-none" />

      {/* Monogram S&S Container */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative group cursor-pointer inline-block"
      >
        <div className="relative z-10 flex items-center justify-center space-x-1">
          <span className="font-serif text-6xl sm:text-8xl font-bold tracking-tight text-monogram-gradient text-glow-rosegold select-none">
            S
          </span>
          <span className="font-serif text-4xl sm:text-6xl font-light text-rosegold-mid opacity-90 mx-1 select-none italic">
            &
          </span>
          <span className="font-serif text-6xl sm:text-8xl font-bold tracking-tight text-monogram-gradient text-glow-rosegold select-none">
            S
          </span>
        </div>

        {/* Decorative thin metallic line below monogram */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-rosegold-light/60 to-transparent mt-1"
        />
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-3 flex flex-col items-center"
      >
        <h1 className="font-serif text-2xl sm:text-3xl tracking-widest uppercase font-medium text-rosegold-light text-glow-rosegold">
          Tu Playlist, Saly.
        </h1>
        
        <p className="text-xs sm:text-sm text-rosegold-deep font-light mt-1 tracking-wider uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rosegold-mid animate-pulse" />
          <span>Edición Especial Rose Gold & Obsidian</span>
          <Sparkles className="w-3.5 h-3.5 text-rosegold-mid animate-pulse" />
        </p>
      </motion.div>

      {/* Initial State: Opening Phrase */}
      {isInitial && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-5 font-serif italic text-rosegold-light/70 text-sm sm:text-base max-w-md leading-relaxed"
        >
          "La música siempre dijo lo que mis silencios callaron."
        </motion.p>
      )}

      {/* Playlist Title Badge (shown in non-initial states) */}
      {!isInitial && playlistTitle && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-3 px-4 py-1.5 rounded-full bg-obsidian-card/70 border border-rosegold-deep/30 text-xs text-rosegold-light font-medium tracking-wider uppercase"
        >
          ♫ {playlistTitle}
        </motion.div>
      )}

      {/* Buttons Row */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-4 flex flex-wrap items-center justify-center gap-3"
      >
        {/* Love Letter / Notes */}
        <button
          onClick={onOpenLoveLetter}
          className="px-4 py-2 rounded-full glass-burgundy text-rosegold-light text-xs sm:text-sm font-medium tracking-wide flex items-center space-x-2 shadow-burgundy-glow border border-rosegold/30 hover:border-rosegold-light transition-all duration-300 group"
        >
          <Heart className="w-3.5 h-3.5 text-rosegold-mid group-hover:text-rosegold fill-rosegold-mid/30 animate-pulse" />
          <span>Carta & Notas</span>
          <BookOpen className="w-3.5 h-3.5 text-rosegold-light opacity-80" />
        </button>

        {/* The Question Button — highlighted to guide Saly */}
        <button
          onClick={onOpenQuestion}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-rosegold-dark via-rosegold-mid to-rosegold-light text-obsidian text-xs sm:text-sm font-bold tracking-wide flex items-center space-x-2 shadow-rose-glow hover:shadow-[0_0_35px_rgba(242,203,190,0.45)] transition-all duration-300 group"
        >
          <MessageSquareHeart className="w-4 h-4 text-obsidian group-hover:scale-110 transition-transform" />
          <span>Abrir La Pregunta</span>
        </button>
      </motion.div>
    </header>
  );
}
