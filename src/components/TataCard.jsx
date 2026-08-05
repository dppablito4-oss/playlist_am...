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
      <div className="rounded-2xl p-6 border border-rosegold-deep/30 bg-obsidian-card/80 backdrop-blur-md shadow-burgundy-glow text-center relative overflow-hidden flex flex-col items-center">
        
        {/* Subtle accent glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-rosegold-deep/15 rounded-full blur-2xl pointer-events-none" />

        {/* Tata Image Container with Soft Glow */}
        <div className="relative mb-4 group">
          <div className="absolute inset-0 bg-rosegold-mid/20 rounded-2xl blur-lg group-hover:bg-rosegold/30 transition-all duration-500" />
          <img
            src="/assets/tata.png"
            alt="Tata Peluche BT21"
            className="relative z-10 w-24 h-24 object-contain rounded-xl drop-shadow-[0_4px_12px_rgba(242,203,190,0.3)] transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback URL in case path changes
              e.target.onerror = null;
              e.target.src = "/tata.png";
            }}
          />
        </div>

        {/* Header */}
        <h4 className="font-serif text-base font-bold text-rosegold-light tracking-wider mb-2">
          Tata 🧸
        </h4>

        {/* Body Text */}
        <p className="text-xs sm:text-sm text-rosegold-light/90 font-serif italic leading-relaxed mb-4 max-w-xs mx-auto">
          "También me acordé de él. Nunca entendí por qué te gustaba tanto... pero siempre me hacía feliz verte sonreír cuando hablabas de él."
        </p>

        {/* Signature */}
        <p className="text-xs text-rosegold-mid font-semibold self-end">
          — Samuel
        </p>

      </div>
    </motion.div>
  );
}
