/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        fontFamily: {
        poppins: ["poppins", "sans-serif"], 
        "poppins-bold": ["poppins-bold", "sans-serif"],
        "poppins-extrabold": ["poppins-extrabold", "sans-serif"],
        "poppins-extralight": ["poppins-extralight", "sans-serif"],
        "poppins-light": ["poppins-light", "sans-serif"],
        "poppins-medium": ["poppins-medium", "sans-serif"],
        "poppins-thin": ["poppins-thin", "sans-serif"],
        rubik: ["rubik", "sans-serif"]
      },
      colors: {
        alert: "#833264",
        yellow: "#C5A846",
        green: {
          100: "#648467",
          200: "#8DD38E",
        },
        blue: {
          100: "#253642",
          200: "#4D7DAD",
          300: "#92BED5",
        },
      }
    },
  },
  plugins: [],
}

// import { Client, Account, ID } from 'react-native-appwrite';

// const client = new Client()
//     .setProject('67dfe9ed003d071c2526')
//     .setPlatform('com.lumen.orga');
