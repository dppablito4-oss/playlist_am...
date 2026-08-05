import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Music } from 'lucide-react';

export default function GraceTimerBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto px-4 mb-4 z-20"
    >
      <div className="rounded-2xl p-4 bg-gradient-to-r from-rose-950/80 via-red-900/60 to-rose-950/80 border border-rose-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(244,63,94,0.3)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Left: Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-rose-900/50 border border-rose-500/50 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-rose-200 uppercase tracking-wider">
              Playlist de Despedida Activa
            </h4>
            <p className="text-[11px] text-rose-300/90 font-light mt-0.5">
              Al finalizar de escuchar la playlist, esta página se cerrará definitivamente.
            </p>
          </div>
        </div>

        {/* Right: Badge */}
        <div className="flex items-center space-x-2 bg-black/50 px-3 py-1.5 rounded-xl border border-rose-500/30">
          <Music className="w-4 h-4 text-rose-400 animate-pulse" />
          <span className="text-xs font-medium text-rose-300 tracking-wider uppercase">
            Cierre al terminar
          </span>
        </div>

      </div>
    </motion.div>
  );
}
