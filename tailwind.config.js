/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nyveq: {
          bg: "#060608",
          surface: "#0c0c11",
          card: "#111117",
          cardHover: "#161620",
          border: "#1e1e28",
          borderSubtle: "#15151e",
          gold: "#c5a880",
          goldLight: "#dfb76c",
          goldMuted: "rgba(197, 168, 128, 0.12)",
          goldBorder: "rgba(197, 168, 128, 0.28)",
          platinum: "#e2e2e8",
          purple: "#7c3aed",
          emerald: "#10b981",
          amber: "#f59e0b",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Alexandria', '"IBM Plex Sans Arabic"', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Instrument Serif', 'Cinzel', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
