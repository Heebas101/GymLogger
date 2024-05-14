/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
  theme: {
    extend: {
      colors: {
        darkGray: {
          DEFAULT: '#333333', 
        },
        Green: {
          DEFAULT: '#228b22',
        },
        lightGray: {
          DEFAULT: '#C0C0C0', 
        },
        bgGray:{
          DEFAULT: '#111111',
        }
      },
    },
  },
  plugins: [],
}

