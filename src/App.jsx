import React from 'react';
import { ArrowDown, Feather, Heart, Leaf, Moon, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const paragraphs = [
  'Saly, esto es algo que quería decirte desde hace mucho tiempo. No te escribo para pedirte que vuelvas ni para que me respondas.',
  'Primero, quiero pedirte perdón. Hace casi dos años aceptaste mi propuesta de ser novios y después desaparecí. Sé que pude haberte confundido, ilusionado o hecho pensar muchas cosas. Tenías todo el derecho de sentirte mal.',
  'En ese tiempo estaba atravesando problemas de salud mental y depresión. Debí contártelo, pero no supe entender ni explicar lo que me estaba pasando. No lo digo como excusa: simplemente quiero que conozcas la razón de mi ausencia.',
  'Cuando regresé, tú me pediste que parara y debí respetarlo completamente. Aun así, mantuve conversaciones y palabras cariñosas porque una parte de mí seguía pensando que quizá todavía existía una posibilidad. Ahora entiendo que no puedo obligarte a amarme, confiar en mí ni perdonarme.',
  'También entendí que esta dinámica de seguir hablando y ayudándonos mientras yo mantengo esperanza no me hace bien. Por eso necesito tomar distancia y dejar de buscarte como antes. No es un castigo ni un reclamo; es algo que necesito hacer para poder seguir adelante.',
  'Te deseo sinceramente lo mejor. No permitas que lo que pasó conmigo te haga cerrar el corazón ni te impida ser feliz. Eres una persona valiosa, inteligente y de buen corazón, y mereces vivir algo bonito y tranquilo.',
  'Gracias por haber sido importante para mí y por haberme enseñado tanto. Me quedo con lo bueno, asumo lo que hice mal y te dejo seguir tu camino en paz.',
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
        <header className="flex min-h-[76vh] flex-col justify-center py-20">
          <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-rosegold-deep">
            <span className="h-px w-10 bg-rosegold-deep/60" />
            Carta personal
          </div>

          <h1 className="max-w-3xl font-serif text-display font-medium leading-[0.98] text-rosegold-light text-glow-rosegold">
            Lo que necesitaba decirte.
          </h1>

          <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-rosegold-mid sm:text-2xl">
            No es una pregunta ni una prueba. Solo son unas palabras que necesitaba dejar escritas con calma.
          </p>

          <div className="mt-14 flex items-center gap-4 text-rosegold-deep/70">
            <div className="h-px w-12 bg-rosegold-deep/50" />
            <span className="text-xs uppercase tracking-[0.22em]">Sin necesidad de responder</span>
          </div>

          <ArrowDown aria-hidden="true" className="mt-12 h-4 w-4 text-rosegold-deep/50" />
        </header>

        <Section className="grid gap-10 border-t border-rosegold-light/10 py-20 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-rosegold-deep/30 bg-rosegold-dark/10">
              <Feather className="h-5 w-5 text-rosegold-mid" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-rosegold-deep">Lo que quiero reconocer</p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-rosegold-deep">Lo que necesito hacer</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-rosegold-light">Tomar distancia con respeto.</h2>
          </div>
        </Section>

        <Section className="border-t border-rosegold-light/10 py-24 text-center">
          <Heart aria-hidden="true" className="mx-auto mb-7 h-8 w-8 fill-rosegold-dark/30 text-rosegold-mid" />
            <p className="mx-auto max-w-xl font-serif text-2xl leading-relaxed text-rosegold-light sm:text-3xl">
              Me quedo con lo bueno, asumo lo que hice mal y te dejo seguir tu camino en paz.
            </p>
          <div className="mt-12">
            <span className="font-script text-5xl text-rosegold-mid">Samuel</span>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-rosegold-deep">Con cariño y sin esperar respuesta</p>
          </div>
        </Section>

        <footer className="border-t border-rosegold-light/10 pt-8 text-center text-xs leading-relaxed text-rosegold-deep/70">
          No hace falta responder. Cuídate mucho.
        </footer>
      </main>
    </div>
  );
}
