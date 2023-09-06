/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl':  "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        '#6':'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        '#25':'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
      },
      backgroundImage:{
        'hero-pattern':"url('./images/background.jpg')",
      }
    },
  },
  plugins: [],
}

