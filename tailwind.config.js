/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f2fb',
          100: '#ece5f7',
          200: '#dbcef0',
          300: '#c2aee5',
          400: '#a387d7',
          500: '#7e56c2', // Primary deep purple from neurobagel.org
          600: '#6c45b0',
          700: '#5c3898',
          800: '#4d2f7e',
          900: '#402868',
          950: '#261642',
          DEFAULT: '#7e56c2',
        },
        accent: {
          300: '#fed766',
          400: '#ffbd2e', // Amber accent from neurobagel.org
          500: '#f59e0b',
          600: '#d97706',
          DEFAULT: '#ffbd2e',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
