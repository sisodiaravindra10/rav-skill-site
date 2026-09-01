/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist", "sans-serif"],
      },
      colors: {
        // The page's three real colours. Everything else is white at an alpha.
        ink: "var(--ink)",
        accent: "var(--accent)",
        scrim: "var(--scrim)",
      },
    },
  },
  plugins: [],
};
