import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          DEFAULT: "#6FC3E8",
          light: "#CDEBF9",
          deep: "#2E8FC0",
        },
        sun: {
          DEFAULT: "#FFC94D",
          light: "#FFE29B",
        },
        meadow: {
          DEFAULT: "#5FA653",
          deep: "#3F7A38",
          light: "#B9DDA8",
        },
        clay: {
          DEFAULT: "#C97A4A",
          deep: "#8C4F2C",
        },
        cream: "#FBF6E9",
        ink: "#2F2416",
      },
      fontFamily: {
        display: ["var(--font-baloo)", "sans-serif"],
        body: ["var(--font-nunito)", "sans-serif"],
      },
      borderRadius: {
        blob: "42% 58% 61% 39% / 45% 42% 58% 55%",
      },
    },
  },
  plugins: [],
};
export default config;
