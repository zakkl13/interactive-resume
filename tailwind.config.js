module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#1D4ED8',
        'secondary': '#9333EA',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
    },
  variants: {
    extend: {},
  },
  plugins: [],
  }
}