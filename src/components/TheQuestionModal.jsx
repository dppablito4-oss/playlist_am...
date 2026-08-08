import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Clock, Compass, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { updateGlobalWebState } from '../lib/supabase';

export default function TheQuestionModal({ isOpen, onClose, onSelectDecision }) {
  const [yesStep, setYesStep] = useState(0); // 0, 1, 2, 3
  const [noStep, setNoStep] = useState(0);   // 0, 1, 2, 3

  if (!isOpen) return null;

  const handleYesClick = async () => {
    if (yesStep < 2) {
      setYesStep(prev => prev + 1);
      setNoStep(0);
    } else {
      // Confetti explosion for YES!
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#f7d6c8', '#e5a3b2', '#c87588', '#9e4b60', '#ffffff']
      });

      await updateGlobalWebState('YES');
      onSelectDecision('YES');
      onClose();
    }
  };

  const handleNoClick = async () => {
    if (noStep < 2) {
      setNoStep(prev => prev + 1);
      setYesStep(0);
    } else {
      await updateGlobalWebState('NO');
      onSelectDecision('NO');
      onClose();
    }
  };

  const handleTimeClick = async () => {
    await updateGlobalWebState('TIME');
    onSelectDecision('TIME');
    onClose();
  };

  const handleMaybeClick = async () => {
    await updateGlobalWebState('MAYBE');
    onSelectDecision('MAYBE');
    onClose();
  };

  const getYesButtonText = () => {
    if (yesStep === 0) return 'SÍ';
    if (yesStep === 1) return '¿Estás segura?';
    if (yesStep === 2) return '¿Sin el peso del pasado?';
    return '[ Confirmar Nuevo Comienzo ]';
  };

  const getNoButtonText = () => {
    if (noStep === 0) return 'NO';
    if (noStep === 1) return '¿Es tu decisión final?';
    if (noStep === 2) return '¿Soltar definitivamente?';
    return '[ Confirmar Despedida ]';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Dark Scrim with Burgundy Tint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-obsidian-deep/85 backdrop-blur-xl"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-lg glass-burgundy rounded-4xl p-6 sm:p-8 shadow-card-active overflow-hidden text-center"
        >
          {/* Decorative ambient glow behind modal */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-rosegold-deep/15 rounded-full blur-3xl pointer-events-none" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full glass-surface text-rosegold-mid hover:text-rosegold-light hover:scale-105 transition-all duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Heart Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rosegold-dark/25 border border-rosegold/30 text-rosegold mb-5 glow-ring">
            <Heart className="w-7 h-7 fill-rosegold/40 animate-pulse" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-rosegold-light text-glow-rosegold font-bold mb-2">
            La Pregunta Final
          </h2>

          <p className="text-xs text-rosegold-deep uppercase tracking-widest mb-6 font-sans font-medium">
            Sea cual sea tu respuesta, estará bien.
          </p>

          {/* Question Quote Box */}
          <div className="relative bg-obsidian-deep/60 rounded-2xl p-5 sm:p-6 border border-rosegold-deep/20 mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-rose-radial pointer-events-none" />
            <p className="relative text-sm sm:text-base text-rosegold-light/90 font-serif leading-relaxed italic">
              "Si después de todo lo que vivimos, lo que aprendí y el hombre en el que me convertí... ¿quisieras intentarlo de nuevo, esta vez desde la calma?"
            </p>
          </div>

          {/* 4 Decision Buttons */}
          <div className="space-y-3">
            
            {/* 1. YES Button (3-Click Confirmation) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleYesClick}
              className={`w-full py-4 px-5 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2.5 transition-all duration-300 cursor-pointer min-h-[48px] ${
                yesStep > 0
                  ? 'bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 text-white border border-emerald-400/40 shadow-[0_0_25px_rgba(52,211,153,0.25)]'
                  : 'bg-gradient-to-r from-rosegold-dark via-rosegold-mid to-rosegold-light text-obsidian font-extrabold shadow-rose-glow'
              }`}
            >
              <Sparkles className="w-4 h-4 text-current" />
              <span>{getYesButtonText()}</span>
              {yesStep > 0 && <span className="text-[10px] bg-black/30 px-2.5 py-0.5 rounded-full font-sans tabular-nums">{yesStep}/3</span>}
            </motion.button>

            {/* Grid 2 Columns for TIME & MAYBE */}
            <div className="grid grid-cols-2 gap-3">
              {/* 2. DAME TIEMPO */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleTimeClick}
                className="py-3.5 px-3 rounded-2xl glass-surface hover:border-rosegold/30 text-rosegold-light font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all duration-200 cursor-pointer min-h-[48px]"
              >
                <Clock className="w-3.5 h-3.5 text-rosegold-mid" />
                <span>Dame Tiempo</span>
              </motion.button>

              {/* 3. TAL VEZ */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleMaybeClick}
                className="py-3.5 px-3 rounded-2xl glass-surface hover:border-rosegold/30 text-rosegold-light font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all duration-200 cursor-pointer min-h-[48px]"
              >
                <Compass className="w-3.5 h-3.5 text-rosegold-mid" />
                <span>Tal Vez</span>
              </motion.button>
            </div>

            {/* 4. NO Button (3-Click Confirmation) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNoClick}
              className={`w-full py-3.5 px-4 rounded-2xl font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer min-h-[48px] ${
                noStep > 0
                  ? 'bg-rose-950/80 text-rose-200 border border-rose-500/50 shadow-[0_0_20px_rgba(225,29,72,0.15)]'
                  : 'bg-obsidian/50 hover:bg-obsidian/70 text-rosegold-deep border border-rosegold-deep/15 hover:text-rosegold-mid hover:border-rosegold-deep/30'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-current" />
              <span>{getNoButtonText()}</span>
              {noStep > 0 && <span className="text-[10px] bg-black/40 px-2.5 py-0.5 rounded-full font-sans tabular-nums">{noStep}/3</span>}
            </motion.button>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
