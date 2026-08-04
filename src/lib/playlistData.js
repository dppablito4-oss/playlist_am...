// ==========================================================
//  playlistData.js — Datos centrales de todas las playlists
//  organizadas por estado (INITIAL, YES, TIME, MAYBE, NO).
// ==========================================================

export const PLAYLISTS = {
  INITIAL: {
    title: 'Lo Que Sentí',
    subtitle: 'El inicio de nuestra historia musical',
    frase: 'La música siempre dijo lo que mis silencios callaron.',
    tracks: [
      {
        id: 101,
        title: 'Prometo',
        artist: 'Pablo Alborán',
        duration: '3:54',
        cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
        audioUrl: '/music/prometo.mp3',
      },
      {
        id: 102,
        title: 'Coleccionista de Canciones',
        artist: 'Camila',
        duration: '5:20',
        cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
        audioUrl: '/music/coleccionista.mp3',
      },
      {
        id: 103,
        title: 'Te Voy a Amar',
        artist: 'Axel',
        duration: '4:12',
        cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
        audioUrl: '/music/te-voy-a-amar.mp3',
      },
      {
        id: 104,
        title: 'Me Soltaste',
        artist: 'Jesse & Joy',
        duration: '3:48',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
        audioUrl: '/music/me-soltaste.mp3',
      },
    ],
  },

  YES: {
    title: 'Construir Desde Cero',
    subtitle: 'Intensa, victoriosa y romántica',
    note: {
      heading: 'Nota de Alegría Maduro',
      emoji: '🌹',
      body: 'Gracias por confiar en el hombre que aprendió a quedarse. No te prometo perfección, te prometo estar. Vamos paso a paso, sin prisa y desde cero.',
      signature: '— Tu Pablito, que ya no se va (S&S)',
    },
    tracks: [
      {
        id: 201,
        title: 'Creo en Ti',
        artist: 'Reik',
        duration: '4:05',
        cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&q=80',
        audioUrl: '/music/creo-en-ti.mp3',
      },
      {
        id: 202,
        title: 'Prometo',
        artist: 'Pablo Alborán',
        duration: '3:54',
        cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
        audioUrl: '/music/prometo.mp3',
      },
      {
        id: 203,
        title: 'Entra en Mi Vida',
        artist: 'Sin Bandera',
        duration: '4:28',
        cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80',
        audioUrl: '/music/entra-en-mi-vida.mp3',
      },
    ],
  },

  TIME: {
    title: 'Pausa y Respiro',
    subtitle: 'Acústica, suave, cero presión',
    note: {
      heading: 'Nota de Respeto',
      emoji: '🕊️',
      body: 'Tómate todo el tiempo que necesites. No hay prisa ni presión. Estaré aquí continuando mi camino, respetando tu espacio y tu ritmo.',
      signature: '— Pablito, esperando con paz (S&S)',
    },
    tracks: [
      {
        id: 301,
        title: 'Únicos',
        artist: 'Siddhartha',
        duration: '4:32',
        cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
        audioUrl: '/music/unicos.mp3',
      },
      {
        id: 302,
        title: 'Sparks',
        artist: 'Coldplay',
        duration: '3:47',
        cover: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&q=80',
        audioUrl: '/music/sparks.mp3',
      },
      {
        id: 303,
        title: 'Ylang Ylang',
        artist: 'FKJ',
        duration: '5:15',
        cover: 'https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?w=400&q=80',
        audioUrl: '/music/ylang-ylang.mp3',
      },
    ],
  },

  MAYBE: {
    title: 'El Tiempo Dirá',
    subtitle: 'Nostálgica, tranquila',
    note: {
      heading: 'Nota de Serenidad',
      emoji: '🌙',
      body: 'El destino y la vida acomodarán las fichas cuando sea el momento. Mientras tanto, me quedo con la paz de haber sido honesto contigo.',
      signature: '— Pablito, en paz con lo vivido (S&S)',
    },
    tracks: [
      {
        id: 401,
        title: 'Luna',
        artist: 'Zoé',
        duration: '4:48',
        cover: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=400&q=80',
        audioUrl: '/music/luna.mp3',
      },
      {
        id: 402,
        title: 'Departamento',
        artist: 'Bandalos Chinos',
        duration: '3:55',
        cover: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=400&q=80',
        audioUrl: '/music/departamento.mp3',
      },
      {
        id: 403,
        title: 'Trátame Suavemente',
        artist: 'Soda Stereo',
        duration: '4:10',
        cover: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=400&q=80',
        audioUrl: '/music/tratame-suavemente.mp3',
      },
    ],
  },

  NO: {
    title: 'Saber Soltar',
    subtitle: 'Aceptación, dignidad y paz',
    note: {
      heading: 'Nota de Despedida Definitiva',
      emoji: '🥀',
      body: 'Acepto tu decisión. Me duele, pero te quiero libre. Gracias por haber sido mi primer gran amor. Te deseo de corazón salud, éxito y paz en tu camino. Adiós, Saly.',
      signature: '— Pablito, para siempre agradecido (S&S)',
    },
    tracks: [
      {
        id: 501,
        title: 'Te Dejo en Libertad',
        artist: 'Ha*Ash',
        duration: '4:02',
        cover: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400&q=80',
        audioUrl: '/music/te-dejo-en-libertad.mp3',
      },
      {
        id: 502,
        title: 'Tú De Qué Vas',
        artist: 'Franco De Vita',
        duration: '4:35',
        cover: 'https://images.unsplash.com/photo-1499415479124-43c32433a620?w=400&q=80',
        audioUrl: '/music/tu-de-que-vas.mp3',
      },
    ],
  },
};

// Theme color map for each state — used for accent theming
export const STATE_THEMES = {
  INITIAL: { accent: 'rosegold', glow: 'rgba(242, 203, 190, 0.35)' },
  YES:     { accent: 'emerald',  glow: 'rgba(52, 211, 153, 0.35)' },
  TIME:    { accent: 'sky',      glow: 'rgba(125, 211, 252, 0.3)' },
  MAYBE:   { accent: 'amber',    glow: 'rgba(251, 191, 36, 0.3)' },
  NO:      { accent: 'rose',     glow: 'rgba(244, 63, 94, 0.3)' },
};
