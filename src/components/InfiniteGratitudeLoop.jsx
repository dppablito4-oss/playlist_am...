import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import BackgroundCanvas from './BackgroundCanvas';

const MESSAGES = [
  {
    quote: "Gracias por los momentos compartidos y por haber sido parte de mi vida.",
    subtext: "Cada recuerdo guardará siempre un lugar especial."
  },
  {
    quote: "Te deseo sinceramente paz, luz y felicidad en cada paso de tu camino.",
    subtext: "Que la vida te regale siempre lo mejor."
  },
  {
    quote: "Adiós, Saly. Cuídate mucho siempre.",
    subtext: "Con gratitud y respeto infinito. — Pablito (S&S)"
  }
];

export default function InfiniteGratitudeLoop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  const current = MESSAGES[index];

  return (
    <div className="fixed inset-0 z-50 bg-obsidian-deep text-rosegold selection:bg-none flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Background Interactive Stardust */}
      <BackgroundCanvas />

      {/* Deep Red Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-950/30 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        
        {/* Monogram S&S */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-1">
            <span className="font-serif text-6xl sm:text-8xl font-bold tracking-tight text-monogram-gradient text-glow-rosegold select-none">
              S
            </span>
            <span className="font-serif text-4xl sm:text-6xl font-light text-rosegold-mid opacity-70 mx-1 select-none italic">
              &
            </span>
            <span className="font-serif text-6xl sm:text-8xl font-bold tracking-tight text-monogram-gradient text-glow-rosegold select-none">
              S
            </span>
          </div>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-rosegold-deep/40 to-transparent mt-2 w-full" />
        </motion.div>

        {/* Heart Icon */}
        <div className="w-12 h-12 rounded-full bg-rose-950/40 border border-rose-800/40 flex items-center justify-center mb-6 shadow-rose-glow">
          <Heart className="w-6 h-6 text-rose-400/80 fill-rose-500/20 animate-pulse" />
        </div>

        {/* Animated Message Carousel */}
        <div className="h-40 sm:h-36 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1 }}
              className="space-y-3"
            >
              <h2 className="font-serif text-xl sm:text-2xl text-rosegold-light text-glow-rosegold leading-relaxed italic max-w-md">
                "{current.quote}"
              </h2>
              <p className="text-xs sm:text-sm text-rosegold-deep/80 font-light tracking-wider">
                {current.subtext}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Infinite Loop Dots Indicator */}
        <div className="mt-8 flex items-center space-x-2">
          {MESSAGES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-700 ${
                i === index ? 'w-6 bg-rosegold-mid shadow-[0_0_8px_#e5a3b2]' : 'w-1.5 bg-rosegold-dark/40'
              }`}
            />
          ))}
        </div>

        <p className="mt-12 text-[10px] text-rosegold-deep/40 uppercase tracking-widest flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-rosegold-dark opacity-60" />
          <span>Bucle Infinito de Gratitud</span>
          <Sparkles className="w-3 h-3 text-rosegold-dark opacity-60" />
        </p>

      </div>
    </div>
  );
}
