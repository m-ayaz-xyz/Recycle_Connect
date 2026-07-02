/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#f0fff4",
          100: "#e8f5e9",
          200: "#d4edda",
          300: "#a8d5b5",
          400: "#4ade80",
          500: "#2ecc71",
          600: "#22a85f",
          700: "#1a7a47",
        },
      },
    },
  },
  plugins: [],
};
