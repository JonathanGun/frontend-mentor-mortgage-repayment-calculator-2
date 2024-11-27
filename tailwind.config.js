/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
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
  },
  plugins: [],
};
