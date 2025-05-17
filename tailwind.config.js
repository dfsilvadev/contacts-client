/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        custom: "0px 4px 10px 0px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
