module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', './src/style/*.css'],
  theme: {
    screens: {
      sp: { max: '768px'},
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {}
  },
  plugins: [],
}