/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        base: 'clamp(14px, 1.2vw + 1rem, 18px)',
      },
    },
  },
  plugins: [],
}
