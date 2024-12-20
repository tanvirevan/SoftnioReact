/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
module.exports = { // Use module.exports
  content: [
    "./index.html", // Include index.html if you use it
    "./src/**/*.{js,jsx,ts,tsx}", // Important: Include your component files. Use jsx if you are using jsx.
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui,],
}