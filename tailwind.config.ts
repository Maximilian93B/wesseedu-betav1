/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{ts,tsx}",
	  "./components/**/*.{ts,tsx}",
	  "./app/**/*.{ts,tsx}",
	  "./src/**/*.{ts,tsx}",
	  "*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "2xl": "1400px",
		},
	  },
	  extend: {
		fontFamily: {
			helvetica: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
			secondary: ["Georgia", "Times New Roman", "serif"],
			display: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
			body: ["Helvetica", "Arial", "sans-serif"],
		},
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  teal: {
			500: "#00C9A7",
			600: "#00A388",
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
		  "accordion-down": {
			from: { height: "0px" },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0px" },
		  },
		  gradient: {
			'0%': { backgroundPosition: '0% center' },
			'100%': { backgroundPosition: '-200% center' },
		  },
		  shimmer: {
			"100%": {
			  backgroundPosition: "200% 0",
			},
		  },
		  "pulse-subtle": {
			"0%, 100%": {
			  opacity: "0.2",
			},
			"50%": {
			  opacity: "0.3",
			},
		  },
		},
		animation: {
		'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		"accordion-down": "accordion-down 0.2s ease-out",
		"accordion-up": "accordion-up 0.2s ease-out",
		  gradient: 'gradient 3s linear infinite',
		  shimmer: "shimmer 5s infinite",
		  "pulse-subtle": "pulse-subtle 4s infinite",
		},
		screens: {
		  'xs': '480px',
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
}

export default config;
  
  