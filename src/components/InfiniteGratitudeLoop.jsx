import React from 'react';
import { motion } from 'framer-motion';
import BackgroundCanvas from './BackgroundCanvas';

export default function InfiniteGratitudeLoop() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-obsidian-deep text-rosegold selection:bg-none flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Tenue Starfield Canvas */}
      <BackgroundCanvas />

      {/* Deep Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rosegold-deep/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-burgundy-vibrant/6 rounded-full blur-2xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center text-center px-6">
        
        {/* Poetic Separating Monogram Loop */}
        <div className="mb-14 relative h-20 flex items-center justify-center">
          
          {/* Left S */}
          <motion.span
            animate={{
              x: [0, 0, 24, 24, 0],
              opacity: [0.9, 0.9, 0.7, 0.7, 0.9]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-monogram-gradient text-glow-rosegold inline-block"
          >
            S
          </motion.span>

          {/* Middle & */}
          <motion.span
            animate={{
              opacity: [0.6, 0.6, 0, 0, 0.6],
              scale: [1, 1, 0.7, 0.7, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="font-script text-3xl sm:text-4xl text-rosegold-mid/60 mx-3 inline-block"
          >
            &
          </motion.span>

          {/* Right S */}
          <motion.span
            animate={{
              x: [0, 10, 45, 45, 0],
              opacity: [0.9, 0.9, 0, 0, 0.9]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-monogram-gradient text-glow-rosegold inline-block"
          >
            S
          </motion.span>

          {/* Subtle line below */}
          <motion.div 
            animate={{ width: ["100%", "100%", "40%", "40%", "100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-rosegold-deep/40 to-transparent" 
          />
        </div>

        {/* Central Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.6 }}
          className="space-y-5"
        >
          <h2 className="font-serif text-2xl sm:text-3xl text-rosegold-light text-glow-rosegold font-medium leading-relaxed">
            Gracias por haber sido parte de mi historia.
          </h2>

          <p className="text-sm sm:text-base text-rosegold-light/70 font-sans font-light tracking-wide italic">
            Te deseo paz, salud y felicidad en tu camino.
          </p>

          <p className="pt-6 font-script text-2xl text-rosegold-mid tracking-wider">
            — Samuel
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
