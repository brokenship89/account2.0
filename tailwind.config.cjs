/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8',    // 主色调
        secondary: '#4285f4',  // 次要色调
      }
    },
  },
  plugins: [],
} 