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
      <div className="rounded-2xl p-4 bg-obsidian-card/90 border border-rosegold-deep/30 backdrop-blur-md shadow-burgundy-glow flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Left: Human Farewell Notice */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-rosegold-dark/20 border border-rosegold-deep/30 flex items-center justify-center flex-shrink-0">
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

        {/* Right: Sobrio Badge */}
        <div className="flex items-center space-x-2 bg-obsidian-deep/80 px-3 py-1.5 rounded-xl border border-rosegold-deep/20">
          <Music className="w-3.5 h-3.5 text-rosegold-mid" />
          <span className="text-[11px] font-medium text-rosegold-light/80 tracking-wider">
            Escuchar la despedida
          </span>
        </div>

      </div>
    </motion.div>
  );
}
