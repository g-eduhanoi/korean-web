/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./assets/**/*.{html,js,hbs}'],
  theme: {
    extend: {
      screens: {
        '2sm': '400px',
      },
    },
  },
  plugins: [],
};
