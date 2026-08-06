import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Compass, Sparkles } from 'lucide-react';

const stateConfig = {
  YES: {
    icon: <Heart className="w-5 h-5 fill-emerald-400/30 text-emerald-400" />,
    borderColor: 'border-emerald-400/30',
    bgGradient: 'from-emerald-950/60 via-emerald-900/40 to-teal-950/50',
    headingColor: 'text-emerald-300',
    bodyColor: 'text-emerald-200/85',
    signatureColor: 'text-emerald-400/80',
    glowShadow: 'shadow-[0_0_30px_rgba(52,211,153,0.15)]',
    iconBg: 'bg-emerald-900/40',
  },
  TIME: {
    icon: <Clock className="w-5 h-5 text-sky-400" />,
    borderColor: 'border-sky-400/30',
    bgGradient: 'from-sky-950/60 via-sky-900/40 to-blue-950/50',
    headingColor: 'text-sky-300',
    bodyColor: 'text-sky-200/85',
    signatureColor: 'text-sky-400/80',
    glowShadow: 'shadow-[0_0_30px_rgba(125,211,252,0.15)]',
    iconBg: 'bg-sky-900/40',
  },
  MAYBE: {
    icon: <Compass className="w-5 h-5 text-amber-400" />,
    borderColor: 'border-amber-400/30',
    bgGradient: 'from-amber-950/60 via-amber-900/40 to-yellow-950/50',
    headingColor: 'text-amber-300',
    bodyColor: 'text-amber-200/85',
    signatureColor: 'text-amber-400/80',
    glowShadow: 'shadow-[0_0_30px_rgba(251,191,36,0.15)]',
    iconBg: 'bg-amber-900/40',
  },
  NO: {
    icon: <Sparkles className="w-5 h-5 text-rosegold-mid" />,
    borderColor: 'border-rosegold-deep/25',
    bgGradient: 'from-obsidian-card via-obsidian-deep to-obsidian-card',
    headingColor: 'text-rosegold-light',
    bodyColor: 'text-rosegold-light/85',
    signatureColor: 'text-rosegold-mid',
    glowShadow: 'shadow-burgundy-glow',
    iconBg: 'bg-rosegold-dark/25',
  },
};

export default function StateBannerNote({ state, note }) {
  if (!note || !stateConfig[state]) return null;

  const cfg = stateConfig[state];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative w-full max-w-3xl mx-auto px-4 mt-8 mb-4 z-20"
    >
      <div
        className={`rounded-4xl p-5 sm:p-7 border ${cfg.borderColor} bg-gradient-to-br ${cfg.bgGradient} backdrop-blur-lg ${cfg.glowShadow} overflow-hidden`}
      >
        {/* Sparkles accent */}
        <div className="absolute top-4 right-4 opacity-20">
          <Sparkles className="w-10 h-10 text-rosegold-light/20" />
        </div>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-10 h-10 rounded-xl ${cfg.iconBg} border ${cfg.borderColor} flex items-center justify-center`}>
            {cfg.icon}
          </div>
          <div>
            <h3 className={`text-sm sm:text-base font-bold ${cfg.headingColor} flex items-center gap-2`}>
              {note.emoji && <span>{note.emoji}</span>}
              <span>{note.heading}</span>
            </h3>
          </div>
        </div>

        {/* Body */}
        <p className={`text-sm sm:text-base ${cfg.bodyColor} font-serif italic leading-relaxed mb-4`}>
          "{note.body}"
        </p>

        {/* Signature */}
        <p className={`text-xs sm:text-sm ${cfg.signatureColor} font-sans font-semibold text-right`}>
          {note.signature}
        </p>
      </div>
    </motion.div>
  );
}
