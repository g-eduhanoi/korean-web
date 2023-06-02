/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./assets/views/**/*.{html,js,hbs}'],
  theme: {
    extend: {
      screens: {
        '2sm': '400px',
      },
    },
  },
  plugins: [],
};
