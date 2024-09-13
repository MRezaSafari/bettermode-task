/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        coal: {
          background: "#101011",
          foreground: "#1f1f21",
          border: "#2b2a2a",
          shadow_inset: "#1b1b1d"
        }
      }
    },
  },
  plugins: [],
}