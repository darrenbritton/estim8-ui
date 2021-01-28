const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './pages/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({ '.montserrat': { fontFamily: 'Montserrat' } });
    }),
  ],
};
