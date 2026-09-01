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
        // Literal, because a var() here makes Tailwind emit no utility at all.
        // Keep in sync with the :root block in src/index.css, which the
        // hand-written rules use.
        ink: "#0b0b0c",
        accent: "#f58549",
        scrim: "#040a10",
      },
    },
  },
  plugins: [],
};
