import presetWind from "@unocss/preset-wind"
import { defineConfig, presetAttributify } from "unocss"

export default defineConfig({
	presets: [
		presetAttributify({}),
		presetWind(),
	],
	theme: {
		colors: {
			"c-surface": "var(--surface)",
			"c-on-surface": "var(--on-surface)",
			"c-surface-variant": "var(--surface-variant)",
			"c-on-surface-variant": "var(--on-surface-variant)",
			"c-border-1": "var(--border-1)",

			"c-root-color": "var(--root-color)",
			"c-primary": "var(--primary)",
			"c-on-primary": "var(--on-primary)",
			"c-outline": "var(--outline)",
		},
		fontFamily: {
			"display": ["Poppins", "sans-serif"],
			"body": ["'Atkinson Hyperlegible'", "sans-serif"],
		},
	},
})
