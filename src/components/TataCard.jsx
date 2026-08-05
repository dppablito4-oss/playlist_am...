import React from 'react';
import { motion } from 'framer-motion';

export default function TataCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="w-full max-w-md mx-auto px-4 mt-8 mb-12 z-20"
    >
      <div className="rounded-2xl p-5 border border-rosegold-deep/30 bg-obsidian-card/80 backdrop-blur-md shadow-burgundy-glow text-center relative overflow-hidden">
        
        {/* Subtle accent glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-rosegold-deep/15 rounded-full blur-2xl pointer-events-none" />

        {/* Emoji / Header */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          <span className="text-2xl">🧸</span>
          <span className="font-serif text-base font-bold text-rosegold-light tracking-wide">
            Tata
          </span>
        </div>

        {/* Body Text */}
        <p className="text-xs sm:text-sm text-rosegold-light/90 font-serif italic leading-relaxed mb-4">
          "También me acordé de él. Nunca entendí por qué te gustaba tanto... pero siempre me hacía feliz verte sonreír cuando hablabas de él."
        </p>

        {/* Signature */}
        <p className="text-xs text-rosegold-mid font-semibold text-right">
          — Samuel
        </p>

      </div>
    </motion.div>
  );
}
