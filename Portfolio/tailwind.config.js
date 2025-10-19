import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  // Use class strategy so toggling `html.dark` works
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: 'hsl(210deg 10% 3.92%)',
      },
      fontFamily: {
        quicksand: ['Quicksand', ...defaultTheme.fontFamily.sans],
        bricolage: ['"Bricolage Grotesque"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
