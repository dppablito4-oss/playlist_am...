import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music } from 'lucide-react';

export default function GraceTimerBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto px-4 mt-8 mb-2 z-20"
    >
      <div className="rounded-2xl p-4 sm:p-5 bg-obsidian-card/90 border border-rosegold-deep/30 backdrop-blur-md shadow-burgundy-glow flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        {/* Left: Human Farewell Notice */}
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-full bg-rosegold-dark/20 border border-rosegold-deep/30 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-rosegold-mid" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-rosegold-light tracking-wide">
              Playlist de Despedida
            </h4>
            <p className="text-[11px] sm:text-xs text-rosegold-deep font-light mt-0.5">
              Al terminar esta playlist, la página quedará como un mensaje de gratitud.
            </p>
          </div>
        </div>

        {/* Right: Spacious Sobrio Badge */}
        <div className="flex items-center space-x-2.5 bg-obsidian-deep/90 px-5 py-2 sm:px-6 sm:py-2.5 rounded-2xl border border-rosegold-deep/30 flex-shrink-0">
          <Music className="w-4 h-4 text-rosegold-mid" />
          <span className="text-xs font-medium text-rosegold-light/90 tracking-wider">
            Escuchar la despedida
          </span>
        </div>

      </div>
    </motion.div>
  );
}
