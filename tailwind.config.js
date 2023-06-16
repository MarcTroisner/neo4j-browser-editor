/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.indigo,
          900: '#24225E',
          950: '#212046',
          1000: '#1B1A33',
        },
        error: {
          ...colors.red,
          900: '#401818',
          950: '#371414',
          1000: '#2E1010',
        },
        warning: {
          ...colors.amber,
          900: '#563B21',
          950: '#4B331C',
          1000: '#412D1A',
        },
        success: {
          ...colors.green,
          900: '#24225E',
          950: '#212046',
          1000: '#1B1A33',
        },
        base: {
          ...colors.neutral,
          150: '#EDEDED',
          750: '#333333',
          850: '#1F1F1F',
        },
      },
    },
    fontFamily: {
      sans: ['Poppins'],
    },
  },
  plugins: [],
};
