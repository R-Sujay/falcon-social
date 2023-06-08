module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }

        login: { max: "991px" },
        loginSm: { max: "432px" },
      },
      transitionProperty: {
        width: "width",
        display: "visibility, opacity",
      },
      animation: {
        fadeIn: "fadeIn 2s",
        width: "width 0.5s",
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
      },
    },
  },
  plugins: [
    // require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
  ],
};
