import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import BackgroundCanvas from './BackgroundCanvas';

const MESSAGES = [
  {
    quote: "Gracias por haber sido parte de mi historia.",
    subtext: ""
  },
  {
    quote: "Te deseo paz, luz y felicidad en cada paso de tu camino.",
    subtext: ""
  },
  {
    quote: "Adiós, Saly. Cuídate siempre.",
    subtext: "— Samuel"
  }
];

export default function InfiniteGratitudeLoop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = MESSAGES[index];

  return (
    <div className="fixed inset-0 z-50 bg-obsidian-deep text-rosegold selection:bg-none flex flex-col items-center justify-center overflow-hidden">
      {/* Tenue Starfield Canvas */}
      <BackgroundCanvas />

      {/* Content Container */}
      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center text-center px-6">
        
        {/* Monogram — Small & Muted */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="font-serif text-4xl font-bold tracking-tight text-monogram-gradient opacity-60">
              S
            </span>
            <span className="font-serif text-2xl font-light text-rosegold-mid opacity-40 italic">
              &
            </span>
            <span className="font-serif text-4xl font-bold tracking-tight text-monogram-gradient opacity-60">
              S
            </span>
          </div>
        </motion.div>

        {/* Central Rotating Message — Clean and Spacious */}
        <div className="min-h-[120px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 1.2 }}
              className="space-y-5"
            >
              <p className="font-serif text-xl sm:text-2xl text-rosegold-light/85 text-glow-rosegold leading-relaxed font-normal">
                {current.quote}
              </p>
              {current.subtext && (
                <p className="text-sm text-rosegold-deep/70 font-medium tracking-wider">
                  {current.subtext}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator — Minimal */}
        <div className="mt-16 flex items-center space-x-2">
          {MESSAGES.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-700 ${
                i === index ? 'w-5 h-1.5 bg-rosegold-mid/60' : 'w-1.5 h-1.5 bg-rosegold-dark/30'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
