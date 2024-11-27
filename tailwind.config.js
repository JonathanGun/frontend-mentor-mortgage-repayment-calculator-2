/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    colors: {
      ...colors,
      primary: {
        DEFAULT: "#DBDB2D",
      },
      secondary: {
        light: "#819EB0",
        DEFAULT: "#133040",
        dark: "#112833",
      },
    },
  },
  plugins: [],
};
