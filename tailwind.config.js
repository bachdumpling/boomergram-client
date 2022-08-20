/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'black-rgba':'rgba(0,0,0,0.3)',
        'black-rgba2':'rgba(0,0,0,0.7)'
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/forms')
  ],
}