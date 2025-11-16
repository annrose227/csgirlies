/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        candy: {
          pink: '#FFDCEB',      // Cotton Pink
          white: '#FFF7FA',      // Marshmallow White
          blue: '#DDEBFF',       // Candy Blue
          lilac: '#EBD8FF',      // Donut Lilac
          gold: '#FFE7A1',       // Caramel Gold
          purple: '#D8C2FF',     // Aura Purple
          peach: '#FFEADF',      // Sky Peach
        },
        pastel: {
          pink: '#FFD6E8',
          purple: '#E8D5FF',
          blue: '#D5E8FF',
          yellow: '#FFF4D5',
          mint: '#D5FFE8',
        },
      },
      fontFamily: {
        girly: ['Comic Sans MS', 'cursive', 'system-ui'],
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}

