import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function TataCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="w-full max-w-md mx-auto px-4 mt-8 mb-12 z-20"
    >
      <div className="rounded-4xl p-6 sm:p-8 border border-rosegold-deep/20 glass-panel shadow-burgundy-glow text-center relative overflow-hidden flex flex-col items-center">
        
        {/* Subtle accent glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-rosegold-deep/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-burgundy-vibrant/8 rounded-full blur-2xl pointer-events-none" />

        {/* Shimmer top edge */}
        <div className="absolute top-0 left-0 right-0 h-px shimmer-border" />

        {/* Tata Image Container */}
        <div className="relative mb-5 group">
          <div className="absolute inset-0 bg-rosegold-mid/15 rounded-2xl blur-xl group-hover:bg-rosegold/25 transition-all duration-500" />
          <img
            src="/assets/tata.png"
            alt="Tata Peluche BT21"
            className="relative z-10 w-24 h-24 object-contain rounded-xl drop-shadow-[0_4px_16px_rgba(242,203,190,0.3)] transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback URL in case path changes
              e.target.onerror = null;
              e.target.src = "/tata.png";
            }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <h4 className="font-serif text-base sm:text-lg font-bold text-rosegold-light tracking-wider">
            Tata
          </h4>
          <Heart className="w-4 h-4 fill-rosegold-mid/40 text-rosegold-mid" />
        </div>

        {/* Body Text */}
        <p className="text-xs sm:text-sm text-rosegold-light/85 font-serif italic leading-relaxed mb-5 max-w-xs mx-auto">
          "También me acordé de él. Nunca entendí por qué te gustaba tanto... pero siempre me hacía feliz verte sonreír cuando hablabas de él."
        </p>

        {/* Signature */}
        <div className="pt-4 border-t border-rosegold-deep/15 w-full">
          <p className="text-xs text-rosegold-mid font-sans font-semibold">
            — Samuel
          </p>
        </div>

      </div>
    </motion.div>
  );
}
