module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    color: {},
    colors: {
      "primary-1": "#daa8e1",
      "primary-2": "#c971d5",
      "primary-3": "#bb24e1",
      "primary-4": "#8d1da9",
      "primary-5": "#3f065c",
      "primary-6": "#1c2f50",
      "secondary-1": "#a1a6b6",
      "secondary-2": "#6b7185",
      "secondary-3": "#E2DEA9",
      "secondary-4": "#282b39",
      "secondary-5": "#242735",
      "secondary-6": "#3b3a2d",
      "bg-1": "#a1a6b6",
      "bg-2": "#6b7185",
      "bg-3": "#3a3f50",
      "bg-4": "#282b39",
      "bg-5": "#242735",
      "bg-6": "#11131b",
      black: "000",
      white: "#ffffff",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
      spacing: {
        /* Customize spacing */
      },
      screens: {
        xs: "100px",

        sm: "520px",
        // => @media (min-width: 640px) { ... }
        "2sm": "600px",

        md: "768px",

        "2md": "900px",
        // => @media (min-width: 768px) { ... }

        lg: "1120px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};

/*
    --space-0: 0px;
    --space-4: 4px;
    --space-8: 8px;
    --space-12: 12px;
    --space-16: 16px;
    --space-20: 20px;
    --space-24: 24px;
    --space-28: 28px;
    --space-32: 32px;
    --space-36: 36px;
    --space-40: 40px;
    --font-size-10: 10px;
    --font-size-12: 12px;
    --font-size-14: 14px;
    --font-size-16: 16px;
    --font-size-20: 20px;
    --font-size-24: 24px;
    --font-size-28: 28px;
    --font-size-40: 40px;
    --line-height-14: 14px;
    --line-height-16: 16px;
    --line-height-20: 20px;
    --line-height-24: 24px;
    --line-height-28: 28px;
    --line-height-32: 32px;
    --line-height-42: 42px;
    --letter-spacing-1: 1px;

    */
