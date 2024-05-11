/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/js/script.js"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        rotate: {
          '0% , 100%': {
            '--tw-gradient-via-position': '30%',
          },
          '10%': {
            '--tw-gradient-via-position': '40%',
          },
          '20%': {
            '--tw-gradient-via-position': '50%',
          },
          '30%': {
            '--tw-gradient-via-position': '60%',
          },
          '40%': {
            '--tw-gradient-via-position': '70%',
          },
          '50%': {
            '--tw-gradient-via-position': '80%',
          },
          '60%': {
            '--tw-gradient-via-position': '70%',
          },
          '70%': {
            '--tw-gradient-via-position': '60%',
          },
          '80%': {
            '--tw-gradient-via-position': '50%',
          },
          '90%': {
            '--tw-gradient-via-position': '40%',
          },
        }
      }
    },
    fontFamily: {
      'poppins': "'Poppins'",
      'roboto-slab': "'Roboto Slab'",
    },
  },
  plugins: [],
}

