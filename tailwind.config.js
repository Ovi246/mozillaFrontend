/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        serif: "Zilla Slab, Georgia , Utopia , Charter , serif",
      },
      backgroundImage: {
        hslabg:
          "linear-gradient(to bottom,var(--desert-storm) 3%,hsla(0,8%,97%,0))",
      },
      backgroundColor: {
        hslaColor: "hsla(0,0%,100%,.1)",
      },
      colors: {
        lightGrey: "var(--light-grey)",
      },
    },
  },
  plugins: [],
};
