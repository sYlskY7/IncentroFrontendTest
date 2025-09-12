/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        ink: "#0e1326",
        "ink-dim": "#4a4f63",
        paper: "#ffffff",
        primary: "#5b64f6",
        accent: "#edb265",
      },
      borderRadius: { card: "16px" },
      boxShadow: { card: "0 6px 24px rgba(0,0,0,.06)" },
    },
  },
  plugins: [],
};