import type { Config } from "tailwindcss";

// Design tokens ported 1:1 from the original site's CSS custom properties
// (main.css / modules.css / auth.css). global.css's tokens are intentionally
// excluded — that file was confirmed dead code and dropped from the rebuild.
//
// Usage: bg-daltar-bg-deep, text-daltar-text-muted, border-daltar-border, etc.
// Naming mirrors the original --color-* variable names so it's easy to trace
// a class back to the CSS it replaces.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        daltar: {
          "bg-deep": "#030712", // page background (main.css --color-bg-deep)
          "bg-card": "#0f172a", // card/modal surfaces (--color-bg-card)
          "bg-input": "#1e293b", // form inputs (--color-bg-input)
          border: "#1e293b", // --color-border
          "text-bright": "#f8fafc", // --color-text-bright
          "text-muted": "#94a3b8", // --color-text-muted
          "accent-blue": "#38bdf8", // --color-accent-blue
          "accent-blue-hover": "#7dd3fc", // .btn-action.primary:hover
          whatsapp: "#25d366", // --color-whatsapp
          "whatsapp-hover": "#1fae53", // .btn-action.wa:hover
          star: "#fbbf24", // --color-star (testimonial ratings)
          chat: "#00bfa5", // .floating-chat-trigger background
          "chat-text": "#041a12", // .floating-chat-trigger text
          "footer-bg": "#f4f9fd", // --footer-bg (light-theme footer)
          "footer-text": "#1e293b", // --footer-text-dark
          "footer-text-muted": "#64748b", // --footer-text-muted
          "footer-blue": "#0084ff" // --footer-blue-icon
        }
      },
      fontFamily: {
        // matches the `*` rule in main.css (font-stack)
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Arial",
          "sans-serif"
        ]
      },
      maxWidth: {
        // matches .container { max-width: 1200px } — used by the
        // shared Container component built in Phase 2
        daltar: "1200px"
      },
      keyframes: {
        // matches @keyframes continuousScrollMarquee in modules.css
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50% - 12px))" }
        }
      },
      animation: {
        marquee: "marquee 25s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
