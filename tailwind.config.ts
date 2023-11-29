import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      mo: { max: "479.98px" },
      sm: "480px",
      md: "768px",
      lg: "1024px",
    },
    extend: {
      keyframes: {
        marquee: {
          from: { transform: "translateX(25%)" },
          to: { transform: "translateX(-55%)" },
        },
      },
      animation: {
        slider: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
