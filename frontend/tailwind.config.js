/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'estonia': ['"Estonia"', 'cursive'], 
        'raleway': ['"Raleway"', 'sans-serif'],
        'trochut': ['"Trochut"', 'cursive'], 
        'trochut-bold': ['"Trochut Bold"', 'cursive'], 
        'trochut-italic': ['"Trochut Italic"', 'cursive'], 
        'cherry-bomb-one': ['"Cherry Bomb One"', 'cursive'], 
      },
      colors: {
        fucshia: '#C52560',
        green: '#6BA952',
        white: '#FFFFFF',
        black: '#000000',
      },
    },
  },
  plugins: [],
}
