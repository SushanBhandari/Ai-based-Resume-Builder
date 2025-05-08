/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      colors: {
        border: "#e5e7eb", // gray-200
        input: "#f9fafb", // gray-50
        ring: "#3b82f6", // blue-500
        background: "#ffffff", // white
        foreground: "#111827", // gray-900
        primary: {
          DEFAULT: "#3b82f6", // blue-500
          foreground: "#ffffff", // white
        },
        secondary: {
          DEFAULT: "#6b7280", // gray-500
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f3f4f6", // gray-100
          foreground: "#6b7280", // gray-500
        },
      },
    },
  },
  plugins: [],
};
