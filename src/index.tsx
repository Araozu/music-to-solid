/* @refresh reload */
import { render } from "solid-js/web"
import { Route, HashRouter } from "@solidjs/router"
import { QueryClientProvider } from "@tanstack/solid-query"
import { query_client } from "./utils/query"

import "@unocss/reset/tailwind.css"
import "virtual:uno.css"
import "./index.css"

import { IndexPage } from "./pages"
import { LoginPage } from "./pages/login"
import { AlbumPage } from "./pages/album/AlbumPage"
import { AlbumIdPage } from "./pages/album/id/AlbumIdPage"
import { Player } from "./components/Player"

const root = document.getElementById("root")

if (import.meta.env.DEV && !(root instanceof HTMLElement))
{
	throw new Error("Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?")
}

render(() => (
	<QueryClientProvider client={query_client}>
		<HashRouter>
			<Route path="/" component={IndexPage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/album" component={AlbumPage} />
			<Route path="/album/:id" component={AlbumIdPage} />
		</HashRouter>
		<div class="h-16 w-full" />
		<Player />
	</QueryClientProvider>
), root!)
