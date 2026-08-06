/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#080406',
          card: '#120a0d',
          deep: '#050304',
          surface: '#1c0e13',
        },
        rosegold: {
          light: '#f7d6c8',
          DEFAULT: '#f2cbbe',
          mid: '#e5a3b2',
          deep: '#c87588',
          dark: '#9e4b60',
          muted: '#b8687a',
        },
        burgundy: {
          glass: 'rgba(158, 43, 72, 0.70)',
          dark: 'rgba(105, 23, 46, 0.50)',
          glow: 'rgba(138, 28, 58, 0.40)',
          vibrant: '#9E2B48',
          deep: '#69172E',
        },
        champagne: {
          DEFAULT: '#F5E6D3',
          dark: '#e8d0b8',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'rose-glow': '0 0 30px rgba(242, 203, 190, 0.25), 0 0 60px rgba(242, 203, 190, 0.08)',
        'rose-glow-lg': '0 0 40px rgba(242, 203, 190, 0.35), 0 0 80px rgba(242, 203, 190, 0.12)',
        'burgundy-glow': '0 8px 32px rgba(138, 28, 58, 0.40), 0 4px 16px rgba(105, 23, 46, 0.30)',
        'card-active': '0 10px 40px rgba(158, 43, 72, 0.35), 0 4px 20px rgba(242, 203, 190, 0.10)',
        'card-hover': '0 6px 24px rgba(158, 43, 72, 0.25)',
        'inner-glow': 'inset 0 1px 0 rgba(247, 214, 200, 0.10), inset 0 -1px 0 rgba(0, 0, 0, 0.20)',
      },
      backgroundImage: {
        'monogram-gradient': 'linear-gradient(135deg, #f7d6c8 0%, #f2cbbe 20%, #e5a3b2 45%, #c87588 70%, #9e4b60 100%)',
        'card-burgundy': 'linear-gradient(135deg, rgba(158, 43, 72, 0.70) 0%, rgba(120, 30, 55, 0.55) 50%, rgba(105, 23, 46, 0.50) 100%)',
        'rose-radial': 'radial-gradient(ellipse at center, rgba(158, 43, 72, 0.15) 0%, transparent 70%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(242, 203, 190, 0.06) 50%, transparent 100%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'float-slow': 'floatSlow 6s infinite ease-in-out',
        'spin-slow': 'spin 25s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-ring': 'glowRing 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 10px rgba(242,203,190,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 24px rgba(242,203,190,0.75))' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}
