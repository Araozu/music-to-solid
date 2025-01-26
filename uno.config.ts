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
			"c-root-color": "var(--root-color)",
			"c-primary": "var(--primary)",
			"c-on-primary": "var(--on-primary)",
			"c-outline": "var(--outline)",
			"c-on-surface-variant": "var(--on-surface-variant)",
		},
	},
})
