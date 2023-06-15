/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neutral: {
          150: '#EDEDED',
          750: '#333333',
          850: '#1F1F1F',
        },
        indigo: {
          950: '#212046',
          1000: '#1B1A33',
        },
      },
    },
    fontFamily: {
      sans: ['Poppins'],
    },
  },
  plugins: [],
};
