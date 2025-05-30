import UnoCSS from "unocss/vite"
import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"

export default defineConfig({
	plugins: [
		UnoCSS(),
		solidPlugin(),
	],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
})
