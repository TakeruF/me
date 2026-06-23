import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep space base
        void: {
          DEFAULT: "#03040a",
          900: "#03040a",
          800: "#070a16",
          700: "#0b1024",
          600: "#111733",
        },
        // Accent ramp: purple -> blue -> cyan
        nebula: {
          purple: "#a855f7",
          indigo: "#6366f1",
          blue: "#3b82f6",
          cyan: "#22d3ee",
          aurora: "#5eead4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(99, 102, 241, 0.55)",
        "glow-cyan": "0 0 80px -12px rgba(34, 211, 238, 0.5)",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 80s linear infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-soft": "pulse-soft 6s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
