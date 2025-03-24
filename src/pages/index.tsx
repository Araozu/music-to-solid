import { A } from "@solidjs/router"
import { Card } from "../components/card"
import { createSignal, For, onMount } from "solid-js"
import { fetch_api } from "../utils/query"

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
		}

		setAlbums(data)
	})

	return (
		<div>
			<Navbar />
			<div class="m-1">
				<Card>
					<div>
						<h2
							class="text-lg"
							font="display medium"
						>
							Random Albums
						</h2>
					</div>

					<div>
						<For each={albums()}>
							{(album) => (
								<p>
									{album.name}
								</p>
							)}
						</For>
					</div>
				</Card>
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

