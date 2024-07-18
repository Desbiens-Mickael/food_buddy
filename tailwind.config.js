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
        'secondary-light': 'var(--secondary-color-light)',
        'secondary-dark': 'var(--secondary-dark-color)',
      },
      fontFamily: {
        title: 'var(--font-title)',
        main: 'var(--font-main)',
      },
      spacing: {
        'custom-height': 'calc(100vh - 150px)',
      },
    },
  },
  plugins: [],
};
