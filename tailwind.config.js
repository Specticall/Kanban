/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      jakarta: ["Plus Jakarta Sans"],
    },
    fontSize: {
      sm: "0.75rem",
      // Paragragh
      pg: "0.8125rem",
      md: "0.9375rem",
      lg: "1.125rem",
      xl: "1.5rem",
    },
    extend: {
      colors: {
        red: "var(--clr-red)",
        redhover: "var(--clr-red-hover)",
        purple: "var(--clr-purple-main)",
        purplehighlight: "var(--clr-purple-hightlight)",
        secondarybutton: "var(--clr-secondary-button)",
        purplehover: "var(--clr-purple-hover)",
        primary: "var(--clr-text-primary)",
        secondary: "var(--clr-medium-grey)",
        elements: "var(--clr-elements)",
        elementstransparent: "var(--clr-elementstransparent)",
        lines: "var(--clr-lines)",
        bg: "var(--clr-bg)",
        shadownav: "var(--clr-shadownav)",
        navhover: "var(--clr-navhover)",
        kebab: "var(--clr-kebab)",
      },
      boxShadow: {
        nav: "0px 10px 20px 0px var(--clr-shadownav)",
        item: "0px 4px 6px 0px var(--clr-shadowitem)",
      },
      screens: {
        md: "786px",
      },
    },
  },
  plugins: [],
};

/*
    --clr-white: #ffffff;
    --clr-black: #000112;
    --clr-dark-grey: #2b2c37;
    --clr-purple-main: #635fc7;
    --clr-purple-hover: #a8a4ff;
    --clr-medium-grey: #828fa3;
    --clr-red: #ea5555;
    --clr-red-hover: #ff9898;

    Same colors on both themes
    --clr-text-secondary: #828fa3;

*/
