import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {

      /* ── Color tokens ─────────────────────────────────────────── */
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Surface layers
        surface:  "rgba(255,255,255,0.018)",
        overlay:  "rgba(255,255,255,0.035)",
        // Accent palette
        accent: {
          violet: "#c4b5fd",
          indigo: "#818cf8",
          cyan:   "#67e8f9",
        },
        // Semantic
        active:   "#34d399",
        drafting: "#fbbf24",
      },

      /* ── Typography ───────────────────────────────────────────── */
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },

      /* ── Font weights — named aliases ─────────────────────────── */
      fontWeight: {
        thin:       "100",
        extralight: "200",
        // Named design-system weights:
        "display":  "230",
        "editorial":"270",
        light:      "300",
        "refined":  "340",
        "body":     "380",
        normal:     "400",
        "medium-":  "440",
        medium:     "500",
        semibold:   "600",
        bold:       "700",
        extrabold:  "800",
        black:      "900",
      },

      /* ── Spacing ──────────────────────────────────────────────── */
      spacing: {
        "navbar": "52px",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "28": "7rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "36": "9rem",
      },

      /* ── Max widths ───────────────────────────────────────────── */
      maxWidth: {
        "site": "1080px",
        "prose-wide": "640px",
        "prose-mid":  "560px",
        "prose-sm":   "480px",
      },

      /* ── Border radius ────────────────────────────────────────── */
      borderRadius: {
        "xs":  "4px",
        "sm":  "6px",
        "md":  "8px",
        "lg":  "10px",
        "xl":  "14px",
        "2xl": "18px",
        "3xl": "24px",
        "pill":"9999px",
      },

      /* ── Box shadows ──────────────────────────────────────────── */
      boxShadow: {
        // Navbar scroll state
        "nav-float": "0 8px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset",
        "nav-idle":  "0 4px 24px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.03) inset",
        // Card hover
        "card-hover": "0 16px 48px rgba(0,0,0,0.3)",
        // CTA button
        "cta-idle":   "0 0 36px rgba(255,255,255,0.06)",
        "cta-hover":  "0 0 48px rgba(255,255,255,0.10)",
      },

      /* ── Letter spacing ───────────────────────────────────────── */
      letterSpacing: {
        "tightest": "-0.06em",
        "tighter":  "-0.04em",
        "tight":    "-0.02em",
        "snug":     "-0.01em",
        "normal":    "0em",
        "wide":      "0.04em",
        "wider":     "0.12em",
        "widest":    "0.28em",
        "label":     "0.34em",
      },

      /* ── Line heights ─────────────────────────────────────────── */
      lineHeight: {
        "cinematic": "0.92",
        "headline":  "1.03",
        "title":     "1.12",
        "snug":      "1.22",
        "prose":     "1.88",
        "relaxed":   "1.94",
      },

      /* ── Transitions ──────────────────────────────────────────── */
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
        "500": "500ms",
        "700": "700ms",
        "900": "900ms",
      },

      transitionTimingFunction: {
        "site":   "cubic-bezier(0.22, 1, 0.36, 1)",
        "sharp":  "cubic-bezier(0.4, 0, 0, 1)",
        "slow":   "cubic-bezier(0.16, 1, 0.3, 1)",
        "out":    "cubic-bezier(0, 0, 0.2, 1)",
      },

      /* ── CSS Animations ───────────────────────────────────────── */
      animation: {
        "drift-a":  "drift-a 22s ease-in-out infinite",
        "drift-b":  "drift-b 28s ease-in-out infinite",
        "breathe":  "breathe 7s ease-in-out infinite",
        "ticker":   "ticker 45s linear infinite",
        "bob":      "bob 2.4s ease-in-out infinite",
        "spin-slow":"spin 2.4s linear infinite",
      },

      keyframes: {
        "drift-a": {
          "0%, 100%": { transform: "translate(0px, 0px)"   },
          "25%":       { transform: "translate(-32px, 26px)" },
          "50%":       { transform: "translate(20px, -22px)" },
          "75%":       { transform: "translate(-16px, 34px)" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate(0px, 0px)"    },
          "33%":       { transform: "translate(26px, -30px)"  },
          "66%":       { transform: "translate(-20px, 20px)"  },
        },
        "breathe": {
          "0%, 100%": { opacity: "0.06", transform: "scale(1)"    },
          "50%":       { opacity: "0.11", transform: "scale(1.18)" },
        },
        "ticker": {
          "0%":   { transform: "translateX(0)"    },
          "100%": { transform: "translateX(-50%)" },
        },
        "bob": {
          "0%, 100%": { opacity: "0.35", transform: "translateY(0px)" },
          "50%":       { opacity: "0.15", transform: "translateY(5px)" },
        },
      },
    },
  },

  plugins: [],
};

export default config;
