/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    container: {
      center: true,
      padding: 'calc(1rem - 1px)',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-dark': 'var(--primary-color-dark)',
        secondary: 'var(--secondary-color)',
        'secondary-light': 'var(--secondary-light-color)',
        tertiary: 'var(--tertiary-color)',
        'tertiary-light': 'var(--tertiary-light-color)',
        'secondary-dark': 'var(--secondary-dark-color)',
      },
      fontFamily: {
        title: 'var(--font-title)',
        main: 'var(--font-main)',
      },
      spacing: {},
    },
  },
  plugins: [],
};
