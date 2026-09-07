import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-hind-siliguri)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "var(--font-hind-siliguri)", "system-ui", "sans-serif"],
        bengali: ["var(--font-hind-siliguri)", "sans-serif"],
      },
      colors: {
        brand: {
          deep: "#0f172a",
          bg: "#ffffff",
          card: "#f8fafc",
          darkText: "#111827",
          accent: "#2563eb",
          accentHover: "#1d4ed8",
          cyan: "#06b6d4",
          teal: "#0d9488",
          grey: "#64748b",
        },
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "float-fast": "float 5s ease-in-out infinite",
        "pulse-soft": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 15s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
