import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151515",
        muted: "#5d6470",
        line: "#d7dce2",
        paper: "#ffffff",
        surface: "#f6f7f9",
        teal: "#0f766e",
        saffron: "#b45309",
        berry: "#9f1239"
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 16px 36px rgba(21, 21, 21, 0.08)"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
