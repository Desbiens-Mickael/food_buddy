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
      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-100%)', opacity: 0 },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.5s ease-in-out',
        'slide-out-left': 'slide-out-left 0.5s ease-in-out',
        'slide-in-right': 'slide-in-right 0.5s ease-in-out',
        'slide-out-right': 'slide-out-right 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
