import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: {
          50: "#FAF9F6",
          100: "#F4F1EA",
          200: "#E8E2D5",
          300: "#D7CCB8",
        },
        forest: {
          500: "#2D4A3E",
          600: "#233A30",
          700: "#1A2B24",
          800: "#121E19",
          900: "#0B1310",
        },
        sage: {
          100: "#E7EFEA",
          400: "#8FA396",
          500: "#708779",
        }
      },
      fontFamily: {
        serif: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        title: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
