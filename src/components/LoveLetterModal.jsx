import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Send, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getLoveNotes, addLoveNote } from '../lib/supabase';

export default function LoveLetterModal({ isOpen, onClose }) {
  const [notes, setNotes] = useState([]);
  const [sender, setSender] = useState('Saly');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Confetti effect on open
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f7d6c8', '#e5a3b2', '#c87588', '#9e4b60']
      });

      // Load notes
      getLoveNotes().then(setNotes);
    }
  }, [isOpen]);

  const handleSubmitNote = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    const added = await addLoveNote(sender || 'Saly', content.trim());
    setNotes(prev => [added, ...prev]);
    setContent('');
    setIsSubmitting(false);

    // Heart explosion confetti
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f2cbbe', '#e5a3b2', '#ffffff']
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-obsidian-deep/85 backdrop-blur-xl"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-xl max-h-[85vh] glass-burgundy rounded-4xl p-6 sm:p-8 shadow-card-active overflow-y-auto flex flex-col"
        >
          {/* Ambient glow */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-rosegold-deep/12 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full glass-surface text-rosegold-mid hover:text-rosegold-light hover:scale-105 transition-all duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Letter Title */}
          <div className="text-center pb-5 border-b border-rosegold-deep/15 mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rosegold-dark/25 border border-rosegold/25 text-rosegold-light mb-3 glow-ring">
              <Heart className="w-6 h-6 fill-rosegold-mid/40 animate-pulse text-rosegold" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-rosegold-light text-glow-rosegold font-bold">
              Para ti, Saly
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <Heart className="w-3 h-3 fill-rosegold-mid/50 text-rosegold-mid" />
              <p className="text-xs text-rosegold-deep uppercase tracking-widest font-sans font-medium">
                Nuestra Historia & Notas de Amor (S&S)
              </p>
            </div>
          </div>

          {/* Dedicated Message */}
          <div className="relative bg-obsidian-deep/50 rounded-2xl p-5 sm:p-6 border border-rosegold-deep/15 mb-6 overflow-hidden">
            <div className="absolute inset-0 bg-rose-radial opacity-50 pointer-events-none" />
            <div className="relative space-y-3 text-sm text-rosegold-light/90 font-serif leading-relaxed italic">
              <p>
                "Saly, esta lista de canciones fue creada pensando en cada sonrisa, cada mirada y cada momento especial que compartimos. La música tiene la magia de guardar recuerdos intactos, y este rincón web es únicamente tuyo."
              </p>
              <p className="text-right font-sans not-italic text-xs font-semibold text-rosegold-mid pt-1">
                — Con todo mi amor, Pablito (S&S)
              </p>
            </div>
          </div>

          {/* Love Notes Form */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-rosegold-light mb-3 flex items-center gap-2 font-sans">
              <div className="w-6 h-6 rounded-lg glass-surface flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5 text-rosegold-mid" />
              </div>
              <span>Dejar una Nota de Amor</span>
            </h3>

            <form onSubmit={handleSubmitNote} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-1/3 px-4 py-2.5 text-xs rounded-xl bg-obsidian-deep/50 border border-rosegold-deep/25 text-rosegold-light placeholder-rosegold-deep/50 focus:outline-none focus:border-rosegold-mid/60 focus:shadow-[0_0_12px_rgba(242,203,190,0.15)] transition-all duration-200 font-sans"
                />
                <input
                  type="text"
                  placeholder="Escribe un mensaje de amor..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-2/3 px-4 py-2.5 text-xs rounded-xl bg-obsidian-deep/50 border border-rosegold-deep/25 text-rosegold-light placeholder-rosegold-deep/50 focus:outline-none focus:border-rosegold-mid/60 focus:shadow-[0_0_12px_rgba(242,203,190,0.15)] transition-all duration-200 font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rosegold-dark via-rosegold-mid to-rosegold-light text-obsidian font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-rose-glow hover:shadow-rose-glow-lg transition-all duration-250 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer min-h-[44px]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Guardando...' : 'Enviar Nota de Amor'}</span>
              </button>
            </form>
          </div>

          {/* Love Notes List */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-rosegold-deep flex items-center gap-2 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-rosegold-mid" />
              <span>Buzón de Mensajes Recientes</span>
            </h3>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-obsidian-deep/40 rounded-xl p-3.5 border border-rosegold-deep/12 text-xs transition-colors duration-200 hover:border-rosegold-deep/25"
                >
                  <div className="flex justify-between items-center text-rosegold-mid font-semibold mb-1.5 font-sans">
                    <span>{note.sender}</span>
                    <span className="text-[10px] text-rosegold-deep/60 font-sans tabular-nums">
                      {new Date(note.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-rosegold-light/80 font-light font-sans leading-relaxed">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
