/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6363",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
      fontFamily: {
        Nunito: ["Nunito", "sans-serif;"],
        Montserrat: ["Montserrat", "sans-serif;"],
      },
      width: () => ({
        "1/8": "12.5%",
      }),
      keyframes: {
        fill: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        fill: "fill 30s linear normal",
      },
      backgroundImage: {
        "welcome-bg":
          "url('https://img5.goodfon.com/wallpaper/nbig/7/51/kasety-muzyka-fon-1.jpg')",
      },
    },
  },
  plugins: [],
};
