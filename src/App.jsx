import React from 'react';
import { ArrowDown, Heart, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const letterParts = [
  {
    paragraphs: [
      'Primero que nada, me alegra saber que estás bien y que eres feliz. De verdad. Creo que pocas veces te había escuchado decirlo con tanta seguridad y, aunque quizá suene raro viniendo de mí después de todo, me da tranquilidad saberlo. Siempre quise que estuvieras bien, incluso si al final ese bienestar ya no tenía nada que ver conmigo.',
      'También tengo que ser sincero conmigo mismo. La forma en la que seguimos hablando actualmente ya no me está haciendo bien, y creo que seguir fingiendo que puedo llevarlo con normalidad sería mentirme.',
      'Sé que cometí muchos errores contigo. Cuando te pedí que fuéramos novios aquel 19 de marzo, yo estaba pasando por muchas cosas y terminé llevando problemas que eran míos hacia nosotros. Y cuando tú te abriste conmigo, cuando confiaste en mí y me dijiste cómo te sentías, no supe responder de la manera que debía. Terminé lastimando a alguien que en ese momento significaba muchísimo para mí, y es algo que todavía me pesa recordar.',
      'Después, en julio, intenté regresar como si todo pudiera volver a ser como antes. Como si bastara con quererlo para borrar lo que había pasado. Ahora entiendo que fue egoísta de mi parte. Tú pusiste un límite y estabas en todo tu derecho. Había cosas que yo había roto y no podía esperar que tú simplemente las olvidaras.',
    ],
  },
  {
    paragraphs: [
      'Hay algo que tampoco llegué a contarte porque me daba mucha vergüenza. Cuando me alejé y dejé de hablarte estaba pasando por un momento bastante malo emocionalmente. Con el tiempo entendí que lo que estaba viviendo era una depresión. No tenía ganas de estudiar, salir ni hacer casi nada, y en aquel momento ni siquiera comprendía bien lo que me estaba pasando.',
      'Tal vez debí confiar en ti y decirte que no estaba bien, pero no lo hice. Y no te cuento esto para justificarme ni para cambiar la forma en la que ves lo que pasó. Mis errores fueron míos. Simplemente no quería despedirme dejando también esa parte sin decir.',
      'Durante todo este último año seguimos hablando con cierta normalidad. Muchas veces estuve ahí cuando necesitabas ayuda con algún trabajo, algún tema o cualquier cosa. Y quiero dejar algo claro: nunca pensé que te aprovecharas de mí ni que me buscaras con malas intenciones.',
      'El problema fue que yo nunca conseguí separar del todo las cosas.',
      'Me gustaba poder ayudarte, hablar contigo, saber de ti. Pero en algún punto empecé a guardar una pequeña esperanza de que quizá algún día algo pudiera cambiar. Pensaba que tal vez el tiempo iba a hacer que volvieras a verme como antes.',
      'Y terminé aferrándome más a esa posibilidad que a la realidad.',
      'En abril volví a engancharme bastante. Y desde ahí, cualquier mensaje tuyo, incluso uno completamente normal, podía hacer que mi cabeza empezara otra vez con el “quizá algún día”.',
    ],
  },
  {
    paragraphs: [
      'Y sé que no puedo seguir viviendo esperando un “quizá”.',
      'No porque tú hayas hecho algo malo. Tú nunca me prometiste nada. Nunca me dijiste que esperara. Esa esperanza me la construí yo solo.',
      'Por eso he decidido alejarme y dejar de hablar contigo.',
      'No quiero que veas esto como un reclamo, ni como una forma de hacerte sentir culpable, ni mucho menos como un intento de que cambies de opinión. Sea cual sea tu decisión, tu forma de verme o el camino que quieras seguir, está bien. La respeto.',
      'Simplemente yo también necesito tomar una decisión por mí.',
      'Y mi decisión es cerrar esta etapa.',
      'No quiero seguir esperando algo que quizá nunca llegue, ni seguir interpretando pequeños momentos como posibilidades. Quiero poder recordar lo nuestro con cariño sin quedarme atrapado ahí.',
      'Porque sí, a pesar de todo, te tuve muchísimo cariño. Y probablemente una parte de mí siempre va a recordar con cariño quién fuiste en mi vida y lo que significaste para mí en determinado momento.',
      'Pero querer a alguien también puede significar aceptar que las cosas no salieron como uno imaginaba.',
      'Y creo que finalmente estoy aprendiendo a aceptar eso.',
    ],
  },
  {
    paragraphs: [
      'No me voy pensando que tú me debes algo. Tampoco quiero que pienses que me alejo esperando que algún día regreses. Si nuestros caminos vuelven a cruzarse, será lo que tenga que ser, pero yo ya no quiero vivir pendiente de esa posibilidad.',
      'Prefiero quedarme con lo bueno.',
      'Con las conversaciones, los momentos, las cosas que aprendí, incluso con los errores que cometí porque también me hicieron entender muchas cosas sobre mí.',
      'Y aunque nuestra historia no terminó como alguna vez imaginé, me alegra que haya existido.',
      'De corazón espero que te vaya bien. En tus estudios, con tu familia, con tus proyectos y con todo lo que quieras construir para tu vida.',
      'También espero que encuentres personas que sepan cuidarte, respetarte y hacerte sentir tranquila. Y si algún día vuelves a enamorarte, si es que aún no los haces, espero que sea de alguien que sepa valorar esa confianza que alguna vez tú también me diste.',
      'Creo que algunas personas llegan a nuestra vida para quedarse y otras simplemente dejan algo importante antes de continuar su camino.',
      'Tú dejaste algo importante en la mía.',
      'Y creo que ya puedo agradecerlo sin necesidad de seguir aferrándome.',
      'Cuídate mucho.',
      'De verdad espero que seas feliz, incluso si esa felicidad ocurre lejos de mí.',
      'Adiós Saly Beatriz.',
    ],
  },
];

function LetterPart({ paragraphs, index }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="border-t border-rosegold-light/10 py-12 first:border-t-0 sm:py-16"
    >
      <div className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-rosegold-deep sm:mb-8 sm:text-xs sm:tracking-[0.28em]">
        <span className="h-px w-8 bg-rosegold-deep/50" />
        Parte {index + 1}
      </div>
      <div className="glass-panel rounded-3xl p-6 shadow-burgundy-glow sm:rounded-4xl sm:p-12">
        {index === 0 && <Quote aria-hidden="true" className="mb-6 h-7 w-7 text-rosegold-deep/60 sm:h-8 sm:w-8" />}
        <div className="space-y-5 font-serif text-[1.08rem] leading-[1.72] text-rosegold-light/90 sm:space-y-6 sm:text-xl sm:leading-relaxed">
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </motion.section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-obsidian text-rosegold-light">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(158,43,72,0.24),transparent_42%),linear-gradient(180deg,#12070b_0%,#080406_50%,#050304_100%)]" />
      <div className="pointer-events-none fixed -left-32 top-1/3 h-72 w-72 rounded-full bg-rosegold-dark/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 bottom-1/4 h-80 w-80 rounded-full bg-burgundy-vibrant/10 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-3xl px-4 pb-16 sm:px-8 sm:pb-24">
        <header className="flex min-h-[72vh] flex-col justify-center py-16 sm:min-h-[78vh] sm:py-20">
          <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.25em] text-rosegold-deep sm:mb-8 sm:text-xs sm:tracking-[0.3em]">Carta personal</p>
          <h1 className="font-serif text-[clamp(3rem,15vw,5.5rem)] font-medium leading-[0.94] text-rosegold-light text-glow-rosegold">Hola Saly,</h1>
          <p className="mt-7 max-w-2xl font-serif text-xl leading-relaxed text-rosegold-mid sm:mt-9 sm:text-2xl">
            Quería escribirte esto porque siento que ya era momento de decir algunas cosas que durante bastante tiempo me guardé.
          </p>
          <div className="mt-10 flex items-center gap-3 text-rosegold-deep/70 sm:mt-14 sm:gap-4">
            <span className="h-px w-10 bg-rosegold-deep/50 sm:w-12" />
            <span className="text-[10px] uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.22em]">Lee cuando estés lista</span>
          </div>
          <ArrowDown aria-hidden="true" className="mt-10 h-4 w-4 text-rosegold-deep/50 sm:mt-12" />
        </header>

        <article aria-label="Carta para Saly">
          {letterParts.map((part, index) => <LetterPart key={index} paragraphs={part.paragraphs} index={index} />)}
        </article>

        <footer className="border-t border-rosegold-light/10 pt-8 text-center sm:pt-10">
          <Heart aria-hidden="true" className="mx-auto mb-5 h-7 w-7 fill-rosegold-dark/30 text-rosegold-mid" />
          <p className="font-script text-4xl text-rosegold-mid sm:text-5xl">Samuel</p>
          <p className="mt-4 text-xs leading-relaxed text-rosegold-deep/70">No hace falta responder. Cuídate mucho.</p>
        </footer>
      </main>
    </div>
  );
}
