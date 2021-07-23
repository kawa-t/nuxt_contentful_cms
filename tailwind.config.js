const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "375px",
      ...defaultTheme.screens
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
