/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Monochrome, theme-aware palette. Values live in src/index.css.
      colors: {
        page: token('page'), // main background
        surface: token('surface'), // alternate section background
        card: token('card'), // card / panel background
        line: token('line'), // borders & dividers
        ink: token('ink'), // primary text / primary accent
        mute: token('mute'), // secondary text
      },
    },
  },
  plugins: [],
};
