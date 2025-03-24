import { A } from "@solidjs/router"
import { Card } from "../components/card"
import { createSignal, For, onMount } from "solid-js"
import { fetch_api } from "../utils/query"
import { AlbumCard } from "./index/AlbumCard"

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
					<For each={albums()}>
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

export interface Album {
	playCount: number
	playDate: string
	rating: number
	starred: boolean
	starredAt: string
	id: string
	name: string
	embedArtPath: string
	artistId: string
	artist: string
	albumArtistId: string
	albumArtist: string
	allArtistIds: string
	maxYear: number
	minYear: number
	compilation: boolean
	songCount: number
	duration: number
	size: number
	genre: string
	genres: Genre[]
	fullText: string
	orderAlbumName: string
	orderAlbumArtistName: string
	imageFiles: string
	paths: string
	smallImageUrl: string
	mediumImageUrl: string
	largeImageUrl: string
	externalUrl: string
	externalInfoUpdatedAt: string
	createdAt: string
	updatedAt: string
}

export interface Genre {
	id: string
	name: string
}

