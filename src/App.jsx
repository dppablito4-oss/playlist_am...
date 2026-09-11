import React from 'react';
import { ArrowDown, Feather, Heart, Leaf, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const paragraphs = [
  'Saly, esto es algo que quería decirte desde hace mucho tiempo. Durante meses intenté encontrar la forma correcta de explicarte lo que pasó, pero entendí que no necesito construir otra oportunidad ni pedirte que vuelvas. Solo quiero dejar estas palabras claras y asumir mi parte.',
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-obsidian text-rosegold-light">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(158,43,72,0.24),transparent_42%),linear-gradient(180deg,#12070b_0%,#080406_50%,#050304_100%)]" />
      <div className="pointer-events-none fixed -left-32 top-1/3 h-72 w-72 rounded-full bg-rosegold-dark/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 bottom-1/4 h-80 w-80 rounded-full bg-burgundy-vibrant/10 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-4xl px-4 pb-16 sm:px-8 sm:pb-24">
        <header className="flex min-h-[68vh] flex-col justify-center py-16 sm:min-h-[76vh] sm:py-20">
          <div className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-rosegold-deep sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">
            <span className="h-px w-8 bg-rosegold-deep/60 sm:w-10" />
            Carta personal
          </div>

          <h1 className="max-w-3xl font-serif text-[clamp(2.8rem,13vw,5rem)] font-medium leading-[0.98] text-rosegold-light text-glow-rosegold sm:text-display">
            Lo que necesitaba decirte.
          </h1>

          <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-rosegold-mid sm:mt-8 sm:text-2xl">
            No es una pregunta ni una prueba. Solo son unas palabras que necesitaba dejar escritas con calma.
          </p>

          <div className="mt-10 flex items-center gap-3 text-rosegold-deep/70 sm:mt-14 sm:gap-4">
            <div className="h-px w-10 bg-rosegold-deep/50 sm:w-12" />
            <span className="text-[10px] uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.22em]">Lee cuando estés listo</span>
          </div>

          <ArrowDown aria-hidden="true" className="mt-10 h-4 w-4 text-rosegold-deep/50 sm:mt-12" />
        </header>

        <Section className="grid gap-7 border-t border-rosegold-light/10 py-14 sm:gap-10 sm:py-20 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-rosegold-deep/30 bg-rosegold-dark/10 sm:mb-5 sm:h-11 sm:w-11">
              <Feather className="h-4 w-4 text-rosegold-mid sm:h-5 sm:w-5" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold-deep sm:text-xs sm:tracking-[0.26em]">Lo que quiero reconocer</p>
            <h2 className="mt-3 max-w-xs font-serif text-3xl leading-tight text-rosegold-light sm:text-4xl">Sin adornar lo que pasó.</h2>
          </div>

          <article className="glass-panel rounded-3xl p-6 shadow-burgundy-glow sm:rounded-4xl sm:p-12">
            <Quote aria-hidden="true" className="mb-5 h-7 w-7 text-rosegold-deep/60 sm:mb-6 sm:h-8 sm:w-8" />
            <div className="space-y-5 font-serif text-[1.08rem] leading-[1.7] text-rosegold-light/90 sm:space-y-6 sm:text-xl sm:leading-relaxed">
              {paragraphs.slice(0, 3).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        </Section>

        <Section className="border-y border-rosegold-light/10 py-14 sm:py-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center px-2 text-center sm:px-8">
            <Leaf className="mb-5 h-6 w-6 text-rosegold-mid sm:mb-7 sm:h-7 sm:w-7" />
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold-deep sm:text-xs sm:tracking-[0.26em]">Lo que necesito hacer</p>
            <p className="font-serif text-2xl leading-tight text-rosegold-light sm:text-3xl">
              Tomar distancia con respeto y dejar que cada uno continúe su camino.
            </p>
          </div>
        </Section>

        <Section className="grid gap-7 py-14 sm:gap-10 sm:py-20 lg:grid-cols-[1.3fr_0.7fr]">
          <article className="order-2 space-y-5 font-serif text-[1.08rem] leading-[1.7] text-rosegold-light/90 sm:space-y-6 sm:text-xl sm:leading-relaxed lg:order-1">
            {paragraphs.slice(3).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>

          <div className="order-1 lg:order-2 lg:pl-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-rosegold-deep/30 bg-rosegold-dark/10 sm:mb-5 sm:h-11 sm:w-11">
              <Heart className="h-4 w-4 text-rosegold-mid sm:h-5 sm:w-5" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold-deep sm:text-xs sm:tracking-[0.26em]">Lo que queda</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-rosegold-light sm:text-4xl">Gratitud, aprendizaje y paz.</h2>
          </div>
        </Section>

        <Section className="border-t border-rosegold-light/10 py-20 text-center sm:py-24">
          <Heart aria-hidden="true" className="mx-auto mb-6 h-7 w-7 fill-rosegold-dark/30 text-rosegold-mid sm:mb-7 sm:h-8 sm:w-8" />
          <p className="mx-auto max-w-xl font-serif text-2xl leading-relaxed text-rosegold-light sm:text-3xl">
            Me quedo con lo bueno, asumo lo que hice mal y te dejo seguir tu camino en paz.
          </p>
          <div className="mt-9 sm:mt-12">
            <span className="font-script text-4xl text-rosegold-mid sm:text-5xl">Samuel</span>
            <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-rosegold-deep">Con cariño</p>
          </div>
        </Section>

        <footer className="border-t border-rosegold-light/10 pt-7 text-center text-xs leading-relaxed text-rosegold-deep/70 sm:pt-8">
          No hace falta responder. Cuídate mucho.
        </footer>
      </main>
    </div>
  );
}
