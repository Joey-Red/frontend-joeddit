/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        160: "640px",
      },
      height: {
        trueMax: "calc(100vh - 55.99px)",
      },
      minHeight: {
        trueMax: "calc(100vh - 55.99px)",
      },
    },
  },
  plugins: [],
};
