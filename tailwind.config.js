/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        danger: colors.red,
        warning: colors.orange,
        success: colors.green,
        info: colors.sky,
        base: colors.neutral,
      },
    },
    fontFamily: {
      sans: ['Poppins'],
    },
  },
  plugins: [],
};
