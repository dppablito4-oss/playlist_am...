import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Compass, ShieldAlert, Sparkles } from 'lucide-react';

const stateConfig = {
  YES: {
    icon: <Heart className="w-5 h-5 fill-emerald-400/30 text-emerald-400" />,
    borderColor: 'border-emerald-400/40',
    bgGradient: 'from-emerald-950/70 via-emerald-900/50 to-teal-950/60',
    headingColor: 'text-emerald-300',
    bodyColor: 'text-emerald-200/90',
    signatureColor: 'text-emerald-400/80',
    glowShadow: 'shadow-[0_0_25px_rgba(52,211,153,0.2)]',
  },
  TIME: {
    icon: <Clock className="w-5 h-5 text-sky-400" />,
    borderColor: 'border-sky-400/40',
    bgGradient: 'from-sky-950/70 via-sky-900/50 to-blue-950/60',
    headingColor: 'text-sky-300',
    bodyColor: 'text-sky-200/90',
    signatureColor: 'text-sky-400/80',
    glowShadow: 'shadow-[0_0_25px_rgba(125,211,252,0.2)]',
  },
  MAYBE: {
    icon: <Compass className="w-5 h-5 text-amber-400" />,
    borderColor: 'border-amber-400/40',
    bgGradient: 'from-amber-950/70 via-amber-900/50 to-yellow-950/60',
    headingColor: 'text-amber-300',
    bodyColor: 'text-amber-200/90',
    signatureColor: 'text-amber-400/80',
    glowShadow: 'shadow-[0_0_25px_rgba(251,191,36,0.2)]',
  },
  NO: {
    icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
    borderColor: 'border-rose-400/40',
    bgGradient: 'from-rose-950/70 via-rose-900/50 to-red-950/60',
    headingColor: 'text-rose-300',
    bodyColor: 'text-rose-200/90',
    signatureColor: 'text-rose-400/80',
    glowShadow: 'shadow-[0_0_25px_rgba(244,63,94,0.2)]',
  },
};

export default function StateBannerNote({ state, note, onResetQuestion }) {
  if (!note || !stateConfig[state]) return null;

  const cfg = stateConfig[state];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative w-full max-w-3xl mx-auto px-4 mb-4 z-20`}
    >
      <div
        className={`rounded-2xl p-5 sm:p-6 border ${cfg.borderColor} bg-gradient-to-br ${cfg.bgGradient} backdrop-blur-md ${cfg.glowShadow} overflow-hidden`}
      >
        {/* Sparkles accent */}
        <div className="absolute top-3 right-3 opacity-30">
          <Sparkles className="w-12 h-12 text-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-3">
          <div className={`w-9 h-9 rounded-full bg-black/30 border ${cfg.borderColor} flex items-center justify-center`}>
            {cfg.icon}
          </div>
          <div>
            <h3 className={`text-sm sm:text-base font-bold ${cfg.headingColor} flex items-center gap-2`}>
              <span>{note.emoji}</span>
              <span>{note.heading}</span>
            </h3>
          </div>
        </div>

        {/* Body */}
        <p className={`text-sm sm:text-base ${cfg.bodyColor} font-serif italic leading-relaxed mb-3`}>
          "{note.body}"
        </p>

        {/* Signature */}
        <p className={`text-xs sm:text-sm ${cfg.signatureColor} font-semibold text-right`}>
          {note.signature}
        </p>

        {/* Divider & Reset */}
        <div className="mt-4 pt-3 border-t border-white/10 flex justify-center">
          <button
            onClick={onResetQuestion}
            className="text-[10px] sm:text-xs text-white/40 hover:text-white/70 uppercase tracking-widest transition-colors"
          >
            Volver a ver la Pregunta
          </button>
        </div>
      </div>
    </motion.div>
  );
}
