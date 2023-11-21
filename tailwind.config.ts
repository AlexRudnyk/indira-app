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
    extend: {
      keyframes: {
        marquee: {
          from: { transform: "translateX(25%)" },
          to: { transform: "translateX(-50%)" },
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
