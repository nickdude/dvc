/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "lightGrey": "#454545",
        "mediumGrey": "#878787",
        "semiGrey": "#808080",
        "semiLightGrey": "#8A8A8A",
        "grey": "#161616",
        "darkGrey": "#F3F3F3",
        "lightBlue": "#0072EB",
        "greyBlack": "#FFFFFFB2",
        "shadowGrey": "#FAFAFA",
        "lightBlack": "#1D1D1F",
        "semiBlack": "#131518",
        "semiLightBlack": "#3F3F46",
        "offWhite": "#F3F4F5",
        "semiDarkBlack": "#6E7279",
        "darkBlack": "#484C50"

      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        caveat: ['Caveat', 'cursive'],
        gloriaHallelujah: ['Gloria Hallelujah', 'cursive'],
      },
      boxShadow: {
        custom: "0px 10px 10px -3.75px #691F0821",
        fancy: "0px 10px 10px -3.75px #691F0821, 0px 2.29px 2.29px -2.5px #691F0852, 0px 0.6px 0.6px -1.25px #691F085C",
      },
    },
  },
  plugins: [],
};
