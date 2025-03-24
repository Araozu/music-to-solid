import { A } from "@solidjs/router"
import { Card } from "../components/card"
import { createSignal, For, onMount } from "solid-js"
import { fetch_api } from "../utils/query"
import { AlbumCard, AlbumCardSkeleton } from "./index/AlbumCard"
import { Album } from "../utils/types"

export function IndexPage()
{
	const [albums, setAlbums] = createSignal<Array<Album>>([])

	onMount(async() =>
	{
		const [data, err] = await fetch_api<Array<Album>>("/index/random-albums")
		if (err !== null)
		{
			console.error(err)
			console.error(err.error)
			return
		}

		setAlbums(data)
	})

	return (
		<div>
			<Navbar />
			<div border="b-1 c-border-1">
				<h2
					class="text-lg px-2 my-4 mb-2"
					font="display medium"
				>
					Random Albums
				</h2>

				<div id="random-albums" class="overflow-x-scroll whitespace-nowrap mt-2 flex gap-2 px-2 pb-3">
					<For
						each={albums()}
						fallback={new Array(10).fill(0)
							.map(() => (<AlbumCardSkeleton />))}
					>
						{(album) => (
							<AlbumCard album={album} />
						)}
					</For>
				</div>
			</div>
			<div class="m-1">
				<Card>
					<div>
						<h2 class="text-lg" font="display medium">Most Played</h2>
					</div>
				</Card>
			</div>
		</div>
	)
}

function Navbar()
{
	return (
		<nav
			border-b="1 c-border-1"
			class="sticky top-0 py-2 px-2"
		>
			<A href="/" class="font-bold font-display">
				MusicToGo
			</A>
		</nav>
	)
}

