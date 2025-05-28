/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kr: ["Freesentation-1Thin", "sans-serif"],
        en: ["Abril Fatface", "serif"],
        tit: ["Roboto Flex", "serif"],
        tit2: ["Roboto", "serif"],
        com: ["Silkscreen", "serif"],
      },
    },
    plugins: [],
  },
};
