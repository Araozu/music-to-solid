import { useParams, useSearchParams } from "@solidjs/router"
import { createMemo, createSignal, For, onMount } from "solid-js"
import { backend_host, fetch_api } from "../../../utils/query"
import { Album, Song } from "../../../utils/types"

type AlbumGetDTO = {
	album: Album,
	songs: Song[]
}

export function AlbumIdPage()
{
	const params = useParams()
	const [searchParams] = useSearchParams()
	const id = params.id
	const albumName = searchParams.name

	const [imgLoaded, setImgLoaded] = createSignal(false)
	const imgOpacity = () => (imgLoaded() ? "opacity-100" : "opacity-0")

	const [songs, setSongs] = createSignal<Song[]>([])

	const songsAndDiscs = createMemo(() =>
	{
		const s = songs()
		const discs = new Map<number, Song[]>()
		for (const song of s)
		{
			if (!discs.has(song.discNumber)) discs.set(song.discNumber, [])
			discs.get(song.discNumber)!.push(song)
		}

		const discsArray = [...discs.entries()]
		discsArray.forEach(([, songs]) => songs.sort((a, b) => a.trackNumber - b.trackNumber))
		discsArray.sort(([a], [b]) => a - b)

		return discsArray
	})

	onMount(async() =>
	{
		const [data, err] = await fetch_api<AlbumGetDTO>(`/album/${id}`)
		if (err !== null)
		{
			console.error(err)
			console.error(err.error)
			return
		}

		setSongs(data.songs)
		console.log("load...")
	})

	return (
		<div>
			<div class="text-center my-4">
				<img
					class={`inline-block w-68 overflow-hidden rounded transition-opacity ${imgOpacity()}`}
					src={`${backend_host}/covers/${id}`}
					onLoad={() => setImgLoaded(true)}
				/>
			</div>
			<p
				class="my-4"
				font="display semibold"
				text="center 2xl"
			>
				{albumName}
			</p>
			<div>
				<For each={songsAndDiscs()}>
					{([discName, songs]) => (
						<div>
							<p class="font-display font-medium my-2 py-3 px-2 bg-c-surface-variant text-c-on-surface-variant">
								Disc {discName}
							</p>
							<For each={songs}>
								{(song, idx) => (
									<button class="px-2 py-2 inline-block w-full text-left"
										onClick={() =>
										{
											const playEvent = new CustomEvent("queue_and_play", { detail: { queue: songs, idx } })
											window.dispatchEvent(playEvent)
										}}
									>
										<span class="opacity-75">
											{song.trackNumber} -&nbsp;
										</span>
										{song.title}
									</button>
								)}
							</For>
						</div>
					)}
				</For>
			</div>
			<p
				class="opacity-50"
				text="center xs"
			>
				({id})
			</p>
		</div>
	)
}
