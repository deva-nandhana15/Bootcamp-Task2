// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#3b2f2f",      // Dark caramel background
        accent: "#d7b49e",      // Caramel highlight
        primary: "#a47551",     // Rich caramel tone
        textLight: "#f5e9dc",   // Light text color
      },
    },
  },
  plugins: [],
}
