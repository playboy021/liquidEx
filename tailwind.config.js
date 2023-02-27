module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1920px"
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      colors: {
        "brand-purple-dark" : "var(--clr-purple-dark)",
        "brand-purple-mid" : "var(--clr-purple-mid)",
        "brand-purple-light" : "var(--clr-purple-light)",
        "brand-blue-mid" : "var(--clr-blue-mid)",
        "brand-blue-light" : "var(--clr-blue-light)",
        "brand-light" : "var(--clr-light)",
      },
    },
  },
  plugins: [],
}
