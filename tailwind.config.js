module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",

        sm: "640px",

        md: "768px",

        lg: "1024px",

        xl: "1280px",

        "2xl": "1536px",

        login: { max: "991px" },
        loginSm: { max: "432px" },
      },
      transitionProperty: {
        width: "width",
        display: "visibility, opacity",
        display: "visibility, opacity",
      },
      animation: {
        fadeIn: "fadeIn 2s",
        width: "width 0.5s",
        widthShrink: "widthShrink 2s",
        fadeFeedIn: "fadeFeedIn 2.5s",
      },
      keyframes: {
        fadeIn: {
          "0%": { visibility: "hidden" },
          "100%": { visibility: "visible" },
        },
        width: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        widthShrink: {
          "0%": { width: "50%" },
          // "100%": { width: "min" },
        },
        fadeFeedIn: {
          "0%": { opacity: "0" },
          "100%": { visibility: "1" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwind-scrollbar-hide")],
};
