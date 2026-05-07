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
        bg0: "#0b0e18",
        bg1: "#10131f",
        bg2: "#161929",
        bg3: "#1c2035",
        bg4: "#222640",
        ink: "#f0f2ff",
        muted: "#8b93b8",
        line: "rgba(255,255,255,0.10)",
        paper: "#10131f",
        surface: "#161929",
        blue: "#4d8eff",
        teal: "#00d4a4",
        saffron: "#ffb84d",
        berry: "#ff6b9d",
        purple: "#a78bfa"
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
        soft: "0 18px 44px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
