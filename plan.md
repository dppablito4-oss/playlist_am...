Interfaz Web Romántica y Moderna "Tu Playlist, Saly (S&S)"


Desarrollador Frontend Senior & Diseñador UI/UX. Crea una aplicación web moderna, interactiva y de alta fidelidad estética utilizando Vite, React, Tailwind CSS, Lucide React y Framer Motion.
La interfaz debe replicar la elegancia del tema "Rose Gold & Obsidian Dark" para una playlist personalizada.

1. Stack Tecnológico & Librerías

Framework: React + Vite (JS/TS)

Estilos: Tailwind CSS v3+

Animaciones: Framer Motion (para transiciones suaves y efectos de tarjetas)

Iconos: lucide-react

Fuentes: Google Fonts (Cormorant Garamond para títulos elegantes, Montserrat o Inter para texto)

Audio: Web Audio API nativo o howler para simular/reproducir audio real.

2. Guía de Estilos & Design Tokens

Paleta de Colores

Fondo Principal (Obsidiana Nocturna): #0b0709 / #120a0d

Gradiente Monograma S&S: linear-gradient(135deg, #f7d6c8 0%, #e5a3b2 45%, #c87588 70%, #9e4b60 100%)

Texto Rose Gold: #f2cbbe con efecto text-shadow: 0 0 12px rgba(242, 203, 190, 0.3)

Tarjeta Activa (Glassmorphism Borgoña): linear-gradient(90deg, rgba(158, 43, 72, 0.75) 0%, rgba(105, 23, 46, 0.6) 100%) con borde rgba(242, 163, 182, 0.3)

Efectos de Brillo (Glow): Sombras internas y externas box-shadow: 0 8px 25px rgba(138, 28, 58, 0.4)

3. Estructura de Componentes

A. BackgroundCanvas.jsx

Canvas interactivo HTML5 de fondo.

Genera partículas flotantes sutiles (polvo de estrellas / destellos rosados) que suben lentamente y varían su opacidad.

B. GeometricCornerHearts.jsx

Componentes SVG en las esquinas superiores e inferiores.

Estructura geométrica tipo alambre (wireframe mesh) de corazones con líneas finas color rosa dorado y brillo en las intersecciones.

C. Header.jsx

Monograma Central: Un gran texto "S&S" estilizado con la tipografía serif elegante, gradiente rosa-dorado metálico y un aura luminosa de fondo (glow filter).

Subtítulo: "Tu Playlist, Saly." debajo del monograma.

D. HeartMeshPlaylist.jsx (Componente Clave)

Un contenedor central que rodea la lista de canciones.

Un SVG de fondo con ondas matemáticas entrelazadas que forman la silueta de un corazón.

Esferas rosadas metálicas con anillos de órbita ubicadas en puntos estratégicos del perímetro del corazón.

Un renderizado de la lista de canciones dentro de la estructura:

Canción Activa: Muestra botón de Play/Pause integrado, tiempo transcurrido, nombre destacado e indicación de progreso.

Canción Inactiva: Fila minimalista e interactiva con número de track, título y artista.

E. FloatingPlayer.jsx (Reproductor Inferior)

Reproductor flotante con efecto Glassmorphism (backdrop-blur, borde translúcido).

Controles: Botón de Play/Pause estilizado con aura brillante, Skip Next, Skip Previous.

Info Track: Carátula cuadrada redondeada, título en desplazamiento si es muy largo, nombre del artista.

Barra de Progreso: Barra interactiva con indicador rosa brillante que avanza en tiempo real al reproducir.

4. Estado & Lógica de la Aplicación

// Estructura de Datos Recomendada
const PLAYLIST_DATA = [
  {
    id: 1,
    title: "Prometo",
    artist: "Pablo Alborán",
    duration: "3:54",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Coleccionista de Canciones",
    artist: "Camila",
    duration: "5:20",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Te Voy a Amar",
    artist: "Axel",
    duration: "4:12",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Me Soltaste",
    artist: "Jesse & Joy",
    duration: "3:48",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  }
];


Requisitos de Comportamiento:

Al hacer clic en una canción de la lista, debe pasar a ser la canción activa y comenzar la reproducción automáticamente.

Si la canción activa está sonando y se presiona el botón de play/pause, debe pausarse/reanudarse en tiempo real.

El reproductor flotante debe mantenerse fijo en el bottom con soporte para pantalla completa móvil.

5. Salida Esperada

Genera el código modular completo e integrador en un proyecto Vite + React:

Configuración de Tailwind CSS con colores/fuentes personalizadas (tailwind.config.js).

Archivo App.jsx completamente funcional.

Estilos CSS adicionales para gradientes y animaciones clave (index.css).