/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        main:'#9f86c0',
        sec:'#5e548e'
      }
    },
  },
  plugins: [],
}

