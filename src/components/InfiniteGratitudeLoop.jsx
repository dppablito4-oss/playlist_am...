import React from 'react';
import { motion } from 'framer-motion';
import BackgroundCanvas from './BackgroundCanvas';

export default function InfiniteGratitudeLoop() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-obsidian-deep text-rosegold selection:bg-none flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Tenue Starfield Canvas */}
      <BackgroundCanvas />

      {/* Deep Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rosegold-deep/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center text-center px-6">
        
        {/* Monogram S & S — Muted */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-monogram-gradient opacity-60">
              S
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-light text-rosegold-mid opacity-40 italic">
              &
            </span>
            <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-monogram-gradient opacity-60">
              S
            </span>
          </div>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-rosegold-deep/30 to-transparent mt-2 w-full" />
        </motion.div>

        {/* Central Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="font-serif text-2xl sm:text-3xl text-rosegold-light text-glow-rosegold font-medium leading-relaxed">
            Gracias por haber sido parte de mi historia.
          </h2>

          <p className="text-sm sm:text-base text-rosegold-light/75 font-light tracking-wide italic">
            Te deseo paz, salud y felicidad en tu camino.
          </p>

          <p className="pt-6 font-serif text-lg text-rosegold-mid font-semibold tracking-wider">
            — Samuel
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
