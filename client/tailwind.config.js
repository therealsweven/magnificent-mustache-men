/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "bumblebee",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "garden",
      "pastel",
      "luxury",
      "autumn",
    ],
  },
};
