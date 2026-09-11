import React from 'react';
import { ArrowDown, Feather, Heart, Leaf, Moon, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const paragraphs = [
  'Saly, escribo esto sin pedirte que vuelvas y sin esperar una respuesta. Solo necesitaba ordenar lo que siento y dejarte unas palabras honestas.',
  'Te hice ilusión cuando yo mismo no tenía claro qué quería. Después desaparecí cuando estaba pasando por un momento muy difícil y, cuando regresé, quise recuperar algo que ya había cambiado. Sé que eso pudo confundirte y lastimarte. Lo siento.',
  'También entendí que seguir hablando y ayudándote como si nada no me hace bien. Una parte de mí seguía esperando que estar presente hiciera que volvieras a sentir lo mismo. No es justo para ti ni para mí, así que necesito tomar distancia.',
  'No te escribo para reclamarte, convencerte ni convertir esta despedida en otra oportunidad. Te quiero lo suficiente para respetar que tu vida siga por otro camino, aunque a mí me cueste aceptarlo.',
  'Gracias por los momentos, por la confianza y por todo lo que aprendí contigo. Me quedo con lo bueno y también con la responsabilidad de aprender de lo que hice mal.',
];

function Section({ children, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-obsidian text-rosegold-light">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(158,43,72,0.28),transparent_42%),linear-gradient(180deg,#12070b_0%,#080406_50%,#050304_100%)]" />
      <div className="pointer-events-none fixed -left-32 top-1/3 h-72 w-72 rounded-full bg-rosegold-dark/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 bottom-1/4 h-80 w-80 rounded-full bg-burgundy-vibrant/10 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <header className="flex min-h-[82vh] flex-col justify-center py-20">
          <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-rosegold-deep">
            <span className="h-px w-10 bg-rosegold-deep/60" />
            Una última página
          </div>

          <h1 className="max-w-3xl font-serif text-display font-medium leading-[0.98] text-rosegold-light text-glow-rosegold">
            Lo que necesitaba decirte antes de dejarte ir.
          </h1>

          <p className="mt-8 max-w-xl font-serif text-xl italic leading-relaxed text-rosegold-mid sm:text-2xl">
            No es una pregunta. No es una prueba. Es solamente una despedida hecha con calma.
          </p>

          <div className="mt-14 flex items-center gap-4 text-rosegold-deep/70">
            <div className="h-12 w-px bg-gradient-to-b from-rosegold-deep to-transparent" />
            <span className="text-xs uppercase tracking-[0.22em]">Lee cuando quieras</span>
          </div>

          <ArrowDown aria-hidden="true" className="mt-16 h-5 w-5 animate-bounce text-rosegold-deep/70" />
        </header>

        <Section className="grid gap-10 border-t border-rosegold-light/10 py-20 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-rosegold-deep/30 bg-rosegold-dark/10">
              <Feather className="h-5 w-5 text-rosegold-mid" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-rosegold-deep">La verdad</p>
            <h2 className="mt-3 max-w-xs font-serif text-4xl leading-tight text-rosegold-light">Sin adornar lo que pasó.</h2>
          </div>

          <article className="glass-panel rounded-4xl p-7 shadow-burgundy-glow sm:p-12">
            <Quote aria-hidden="true" className="mb-6 h-8 w-8 text-rosegold-deep/60" />
            <div className="space-y-6 font-serif text-lg leading-relaxed text-rosegold-light/90 sm:text-xl">
              {paragraphs.slice(0, 3).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        </Section>

        <Section className="relative py-20">
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-rosegold-deep/30 to-transparent" />
          <div className="relative mx-auto max-w-2xl px-8 text-center">
            <Moon className="mx-auto mb-7 h-7 w-7 text-rosegold-mid" />
            <p className="font-serif text-2xl italic leading-relaxed text-rosegold-light sm:text-3xl">
              “A veces querer a alguien también significa dejar de pedirle que se quede.”
            </p>
          </div>
        </Section>

        <Section className="grid gap-10 border-t border-rosegold-light/10 py-20 lg:grid-cols-[1.3fr_0.7fr]">
          <article className="order-2 space-y-6 font-serif text-lg leading-relaxed text-rosegold-light/90 sm:text-xl lg:order-1">
            {paragraphs.slice(3).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>

          <div className="order-1 lg:order-2 lg:pl-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-rosegold-deep/30 bg-rosegold-dark/10">
              <Leaf className="h-5 w-5 text-rosegold-mid" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-rosegold-deep">Lo que sigue</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-rosegold-light">Aprender a soltar sin odio.</h2>
          </div>
        </Section>

        <Section className="border-t border-rosegold-light/10 py-24 text-center">
          <Heart aria-hidden="true" className="mx-auto mb-7 h-8 w-8 fill-rosegold-dark/30 text-rosegold-mid" />
          <p className="mx-auto max-w-xl font-serif text-2xl leading-relaxed text-rosegold-light sm:text-3xl">
            Gracias por lo que fuimos. Te deseo paz, claridad y una vida bonita.
          </p>
          <div className="mt-12">
            <span className="font-script text-5xl text-rosegold-mid">Samuel</span>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-rosegold-deep">Aquí termina esta página</p>
          </div>
        </Section>

        <footer className="border-t border-rosegold-light/10 pt-8 text-center text-xs leading-relaxed text-rosegold-deep/70">
          No hace falta responder. Cuídate mucho.
        </footer>
      </main>
    </div>
  );
}
