/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
        colors: {
            primary: "#10b3d6",
            secondary: "#1d2746",

            darkTextTitle: "#f8f8f8",
            darkTextSub: "#b9b9b9",
        },
        boxShadow: {
            forum: "0 3px 6px 0 rgba(4, 73, 89, .06);",
            topicCard: "0px 40px 70px 0px rgba(2, 47, 57, .1);",
        }
    },
  },
  plugins: [],
}

