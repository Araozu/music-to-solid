import presetWind from "@unocss/preset-wind"
import { defineConfig } from "unocss"

export default defineConfig({
	// ...UnoCSS options
	presets: [
		presetWind(),
	],
	theme: {
		colors: {
			"c-bg": "var(--bg)",
			"c-on-bg": "var(--on-bg)",
			"c-root-color": "var(--root-color)",
			"c-primary": "var(--primary)",
			"c-on-primary": "var(--on-primary)",
			"c-outline": "var(--outline)",
			"c-on-surface-variant": "var(--on-surface-variant)",
		},
	},
})
