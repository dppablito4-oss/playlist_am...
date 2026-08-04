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
          DEFAULT: '#0b0709',
          card: '#120a0d',
          deep: '#070406',
        },
        rosegold: {
          light: '#f7d6c8',
          DEFAULT: '#f2cbbe',
          mid: '#e5a3b2',
          deep: '#c87588',
          dark: '#9e4b60',
        },
        burgundy: {
          glass: 'rgba(158, 43, 72, 0.75)',
          dark: 'rgba(105, 23, 46, 0.6)',
          glow: 'rgba(138, 28, 58, 0.4)',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'rose-glow': '0 0 25px rgba(242, 203, 190, 0.25)',
        'burgundy-glow': '0 8px 30px rgba(138, 28, 58, 0.45)',
        'card-active': '0 10px 35px rgba(158, 43, 72, 0.35)',
      },
      backgroundImage: {
        'monogram-gradient': 'linear-gradient(135deg, #f7d6c8 0%, #e5a3b2 45%, #c87588 70%, #9e4b60 100%)',
        'card-burgundy': 'linear-gradient(90deg, rgba(158, 43, 72, 0.75) 0%, rgba(105, 23, 46, 0.6) 100%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'float-slow': 'floatSlow 6s infinite ease-in-out',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 10px rgba(242,203,190,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 22px rgba(242,203,190,0.8))' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
