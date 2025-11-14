/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'radial': 'radial-gradient(var(--tw-gradient-stops))',
        'conic': 'conic-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
