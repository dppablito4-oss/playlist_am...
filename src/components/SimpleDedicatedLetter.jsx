import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function SimpleDedicatedLetter() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative z-20 w-full max-w-2xl mx-auto px-6 my-16 text-center"
    >
      {/* Glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-rosegold-deep/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative rounded-4xl p-8 sm:p-12 glass-panel shadow-burgundy-glow overflow-hidden">
        
        {/* Shimmer accent along top */}
        <div className="absolute top-0 left-0 right-0 h-px shimmer-border" />

        {/* Decorative quotes */}
        <div className="absolute top-6 left-6 font-script text-5xl text-rosegold-deep/15 leading-none select-none pointer-events-none">"</div>
        <div className="absolute bottom-6 right-6 font-script text-5xl text-rosegold-deep/15 leading-none select-none pointer-events-none rotate-180">"</div>

        {/* Top Decorative Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rosegold-dark/20 border border-rosegold/25 text-rosegold mb-6 glow-ring">
          <Heart className="w-5 h-5 fill-rosegold/30 text-rosegold-mid animate-pulse" />
        </div>

        <h3 className="text-xs uppercase tracking-[0.3em] font-sans font-medium text-rosegold-deep mb-6 flex items-center justify-center gap-2.5">
          <Sparkles className="w-3.5 h-3.5 text-rosegold-mid opacity-70" />
          <span>Para Ti, Saly</span>
          <Sparkles className="w-3.5 h-3.5 text-rosegold-mid opacity-70" />
        </h3>

        {/* Written Letter Body */}
        <div className="font-serif italic text-base sm:text-lg text-rosegold-light/90 leading-relaxed space-y-6 text-center max-w-lg mx-auto">
          <p>
            "Hay palabras que solo la música sabe transmitir con la honestidad exacta. Cada canción en esta lista guarda una emoción, un aprendizaje y un recuerdo inalterable."
          </p>
          <p>
            "Gracias por todo lo que fuimos, lo que compartimos y lo que me enseñaste. Sin importar lo que depare el destino, siempre desearé lo mejor para ti."
          </p>
        </div>

        {/* Signature */}
        <div className="mt-8 pt-6 border-t border-rosegold-deep/15 flex flex-col items-center">
          <span className="font-script text-3xl text-rosegold-mid tracking-wide">
            Samuel
          </span>
          <span className="text-[10px] text-rosegold-deep/80 uppercase tracking-widest mt-1.5 font-sans">
            (S & S)
          </span>
        </div>

      </div>
    </motion.section>
  );
}
