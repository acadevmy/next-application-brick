import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    colors: {
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      transparent: "hsl(0, 0%, 100%, 0%)",
      primary: {
        lightest: "hsl(var(--primary-lightest))",
        "lightest-foreground": "hsl(var(--primary-lightest-foreground))",
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
        dark: "hsl(var(--primary-dark))",
        "dark-foreground": "hsl(var(--primary-dark-foreground))",
      },
      secondary: {
        lightest: "hsl(var(--secondary-lightest))",
        "lightest-foreground": "hsl(var(--secondary-lightest-foreground))",
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
        dark: "hsl(var(--secondary-dark))",
        "dark-foreground": "hsl(var(--secondary-dark-foreground))",
        "dark-variant": "hsl(var(--secondary-dark-variant))",
        "dark-variant-foreground": "hsl(var(--secondary-dark-variant-foreground))",
      },
      ["dark-grey"]: {
        DEFAULT: "hsl(var(--dark-grey))",
        foreground: "hsl(var(--dark-grey-foreground))",
      },
      ["light-grey"]: {
        DEFAULT: "hsl(var(--light-grey))",
        foreground: "hsl(var(--light-grey-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      success: {
        DEFAULT: "hsl(var(--success))",
        foreground: "hsl(var(--success-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      border: {
        light: "hsl(var(--border-light))",
        DEFAULT: "hsl(var(--border))",
        dark: "hsl(var(--border-dark))",
        darkest: "hsl(var(--border-darkest))",
      },
    },
    borderRadius: {
      none: "0",
      "2xl": "calc(var(--radius) + 4px)",
      xl: "calc(var(--radius) + 2px)",
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
      full: "9999px",
    },
    boxShadow: {
      "on-primary-lightest": "0 4px 20px 0 hsl(var(--primary-dark) / 0.21)",
      "on-white": "0 4px 12px 0 hsl(var(--secondary-dark) / 0.14)",
      "on-white-strong": "0 4px 30px 0 hsl(var(--secondary) / 0.37)",
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["2rem", { lineHeight: "2.5rem" }],
      "4xl": ["2.5rem", { lineHeight: "3rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
    },
    extend: {
      screens: {
        tablet: "700px",
        desktop: "1200px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
