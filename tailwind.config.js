/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        blue: '#18186D',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
}
