/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(0,0,0,0.3)',
        'black-rgba2': 'rgba(0,0,0,0.7)'
      },

      keyframes: {
        slam: {
          '0%':
          {
            transform: 'scale(10, 10)',
            opacity: '0'
          },

          '40%':
          {
            opacity: '0'
          },

          '100%':
          {
            transform: 'scale(1, 1)',
            opacity: '1'
          },  
        },
      },

      animation: {
        slam: ''
      },

      fontFamily: {
        billabong: ["Billabong", "cursive"]
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