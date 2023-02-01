module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    colors: {
      darkblack: "#222",
      black: "#555",
      gray: "#aaa",
      "light-gray": "#ddd",
      "lighter-gray": "#f2f2f2",
      red: "rgb(244, 63, 94)",
      purple: "#89558d",
      white: "#fff",

      "light-orange": "#F9AB70",
      "mid-orange": "#E59091",
      "dark-orange": "#DB6933",
      "light-purple": "#9E81A0",
      "light-red": "#E16075",

      "blue-100": "#003E5A",
      "light-blue": "#006491",
      orange: "#F9AB70",
    },
    extend: {
      boxShadow: {
        vue: "0px -5px 5px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
