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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-deep/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl max-h-[85vh] glass-burgundy rounded-3xl p-6 sm:p-8 shadow-card-active border border-rosegold/40 overflow-y-auto flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-obsidian/40 text-rosegold-mid hover:text-rosegold hover:bg-obsidian/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Letter Title */}
          <div className="text-center pb-4 border-b border-rosegold-deep/20 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rosegold-dark/30 border border-rosegold/30 text-rosegold-light mb-2">
              <Heart className="w-6 h-6 fill-rosegold-mid/40 animate-pulse text-rosegold" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-rosegold-light text-glow-rosegold font-bold">
              Para ti, Saly ❤️
            </h2>
            <p className="text-xs text-rosegold-deep uppercase tracking-widest mt-1">
              Nuestra Historia & Notas de Amor (S&S)
            </p>
          </div>

          {/* Dedicated Message */}
          <div className="bg-obsidian-card/70 rounded-2xl p-5 border border-rosegold-deep/30 mb-6 space-y-3 text-sm text-rosegold-light/90 font-serif leading-relaxed italic">
            <p>
              "Saly, esta lista de canciones fue creada pensando en cada sonrisa, cada mirada y cada momento especial que compartimos. La música tiene la magia de guardar recuerdos intactos, y este rincón web es únicamente tuyo."
            </p>
            <p className="text-right font-sans not-italic text-xs font-semibold text-rosegold-mid">
              — Con todo mi amor, Pablito (S&S)
            </p>
          </div>

          {/* Love Notes Form (Supabase Sync) */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-rosegold-light mb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-rosegold-mid" />
              <span>Dejar una Nota de Amor en Supabase</span>
            </h3>

            <form onSubmit={handleSubmitNote} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tu nombre (ej. Saly)"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-1/3 px-3 py-2 text-xs rounded-xl bg-obsidian/60 border border-rosegold-deep/40 text-rosegold-light placeholder-rosegold-deep/60 focus:outline-none focus:border-rosegold"
                />
                <input
                  type="text"
                  placeholder="Escribe un mensaje de amor..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-2/3 px-3 py-2 text-xs rounded-xl bg-obsidian/60 border border-rosegold-deep/40 text-rosegold-light placeholder-rosegold-deep/60 focus:outline-none focus:border-rosegold"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rosegold-dark to-rosegold-mid text-obsidian font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-rose-glow hover:opacity-95 transition-opacity disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Guardando...' : 'Enviar Nota de Amor'}</span>
              </button>
            </form>
          </div>

          {/* Love Notes List */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-rosegold-deep flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rosegold-mid" />
              <span>Buzón de Mensajes Recientes</span>
            </h3>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-obsidian/50 rounded-xl p-3 border border-rosegold-deep/20 text-xs"
                >
                  <div className="flex justify-between items-center text-rosegold-mid font-semibold mb-1">
                    <span>{note.sender}</span>
                    <span className="text-[10px] text-rosegold-deep/70 font-mono">
                      {new Date(note.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-rosegold-light/80 font-light">
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
