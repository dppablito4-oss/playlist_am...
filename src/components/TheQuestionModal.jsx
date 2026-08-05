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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-deep/90 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          className="relative w-full max-w-lg glass-burgundy rounded-3xl p-6 sm:p-8 shadow-card-active border border-rosegold/50 overflow-hidden text-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-obsidian/40 text-rosegold-mid hover:text-rosegold hover:bg-obsidian/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Heart Icon Top */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rosegold-dark/30 border border-rosegold/40 text-rosegold mb-4 shadow-rose-glow">
            <Heart className="w-7 h-7 fill-rosegold/40 animate-pulse" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-rosegold-light text-glow-rosegold font-bold mb-2">
            La Pregunta Final
          </h2>

          <p className="text-xs text-rosegold-deep uppercase tracking-widest mb-6 font-medium">
            Saly, esta respuesta abrirá tu camino
          </p>

          {/* Question Quote Box */}
          <div className="bg-obsidian/70 rounded-2xl p-5 border border-rosegold-deep/30 mb-8 text-sm sm:text-base text-rosegold-light font-serif leading-relaxed italic shadow-inner">
            "Si después de todo lo que vivimos, lo que aprendí y el hombre en el que me convertí... ¿quisieras intentarlo de nuevo, esta vez desde la calma?"
          </div>

          {/* 4 Decision Buttons Grid */}
          <div className="space-y-3">
            
            {/* 1. YES Button (3-Click Confirmation) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleYesClick}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 shadow-rose-glow ${
                yesStep > 0
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 text-white border-2 border-emerald-300'
                  : 'bg-gradient-to-r from-rosegold-dark via-rosegold-mid to-rosegold-light text-obsidian font-extrabold'
              }`}
            >
              <Sparkles className="w-4 h-4 text-current" />
              <span>{getYesButtonText()}</span>
              {yesStep > 0 && <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-mono">{yesStep}/3</span>}
            </motion.button>

            {/* Grid 2 Columns for TIME & MAYBE */}
            <div className="grid grid-cols-2 gap-3">
              {/* 2. DAME TIEMPO */}
              <button
                onClick={handleTimeClick}
                className="py-3 px-3 rounded-2xl bg-obsidian-card/80 hover:bg-obsidian-card border border-rosegold-deep/40 hover:border-rosegold text-rosegold-light font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all"
              >
                <Clock className="w-3.5 h-3.5 text-rosegold-mid" />
                <span>Dame Tiempo</span>
              </button>

              {/* 3. TAL VEZ */}
              <button
                onClick={handleMaybeClick}
                className="py-3 px-3 rounded-2xl bg-obsidian-card/80 hover:bg-obsidian-card border border-rosegold-deep/40 hover:border-rosegold text-rosegold-light font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-rosegold-mid" />
                <span>Tal Vez</span>
              </button>
            </div>

            {/* 4. NO Button (3-Click Confirmation) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNoClick}
              className={`w-full py-3 px-4 rounded-2xl font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 ${
                noStep > 0
                  ? 'bg-rose-950 text-rose-200 border-2 border-rose-500'
                  : 'bg-obsidian/60 hover:bg-obsidian text-rosegold-deep border border-rosegold-deep/20 hover:text-rosegold-mid'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-current" />
              <span>{getNoButtonText()}</span>
              {noStep > 0 && <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded-full font-mono">{noStep}/3</span>}
            </motion.button>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
