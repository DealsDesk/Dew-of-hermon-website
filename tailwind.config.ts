import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FCFAFE",
        surface: "#F3EDFA",
        surface2: "#EAE0F5",
        ink: "#241733",
        black: {
          DEFAULT: "#0B0A0D",
          soft: "#171420",
        },
        primary: {
          DEFAULT: "#5B3B79",
          dark: "#3E2A54",
          light: "#8B6FA8",
        },
        lavender: {
          DEFAULT: "#C3AEDC",
          pale: "#E4D8F2",
          deep: "#8E76AE",
        },
        silver: {
          DEFAULT: "#B7B6C4",
          light: "#DEDDE6",
          dark: "#8B899C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "mist-gradient":
          "linear-gradient(180deg, #FCFAFE 0%, #F3EDFA 45%, #E4D8F2 100%)",
        "dusk-gradient":
          "linear-gradient(160deg, #3E2A54 0%, #5B3B79 55%, #8E76AE 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(91, 59, 121, 0.15)",
        "glass-lg": "0 20px 60px -10px rgba(36, 23, 51, 0.25)",
        drop: "0 2px 10px rgba(11, 10, 13, 0.08)",
      },
      borderRadius: {
        drop: "50% 50% 50% 0% / 60% 60% 40% 40%",
        "drop-lg": "42% 58% 68% 32% / 55% 45% 55% 45%",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(.23,1,.32,1) forwards",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
