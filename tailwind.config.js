/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zubaida Sarees Royal Luxury Color Palette
        zubaida: {
          black: '#121212',           // Core deep onyx from logo
          charcoal: '#18181B',        // Premium dark typography
          dark: '#121212',            // Primary dark
          gold: '#C5A059',            // Antique zari gold accent
          goldLight: '#E8D3AA',       // Soft champagne gold highlight
          goldDark: '#9E7719',        // Deep burnished gold
          ivory: '#FAF8F5',           // Silk pearl/ivory background
          cream: '#F5EFEB',           // Soft cream secondary background
          pearl: '#FFFFFF',           // Pure white
          border: '#E8E2D8',          // Soft warm border
          sand: '#ECE5DC',            // Muted sand neutral
          muted: '#71717A',           // Slate neutral text
        },
        taaga: {
          terracotta: '#121212',      // Mapped to Zubaida Royal Black
          deep: '#262626',            // Mapped to Onyx Charcoal
          ivory: '#FFFFFF',           // Pure White
          cream: '#FAF8F5',           // Silk Ivory
          dark: '#18181B',            // Deep Charcoal typography
          gold: '#C5A059',            // Antique Zari Gold
          goldLight: '#E8D3AA',       // Soft gold highlight
          pink: '#C5A059',            // Gold accent
          pinkLight: '#FAF5EC',       // Soft gold tint
          sand: '#F5EFEB',            // Sand border/bg
          border: '#E8E2D8',          // Soft warm border
          paper: '#FAF8F5',           // Silk paper
        },
        brand: {
          50: '#FAF8F5',
          100: '#F5EFEB',
          200: '#ECE5DC',
          300: '#E8D3AA',
          400: '#C5A059',
          500: '#121212',   // PRIMARY: Zubaida Royal Black
          600: '#262626',   // Deep Charcoal hover
          700: '#18181B',   // Dark Charcoal title
          800: '#0F0F11',   // Deep Onyx
          900: '#000000',   // Jet Black
          gold: '#C5A059',
          goldLight: '#E8D3AA',
          goldDark: '#9E7719',
          cream: '#FAF8F5',
          sand: '#ECE5DC',
          dark: '#18181B',
          charcoal: '#121212',
          accent: '#C5A059',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['"Caveat"', '"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(18, 18, 18, 0.06)',
        'card': '0 8px 30px -4px rgba(18, 18, 18, 0.08)',
        'nav': '0 -4px 25px rgba(18, 18, 18, 0.05)',
        'editorial': '0 12px 35px -8px rgba(18, 18, 18, 0.12)',
        'gold': '0 4px 20px -2px rgba(197, 160, 89, 0.25)',
      }
    },
  },
  plugins: [],
}