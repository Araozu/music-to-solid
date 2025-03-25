import { Howl } from "howler"
import { Pause, Play, SkipForward } from "phosphor-solid"
import { createEffect, createMemo, createSignal, onCleanup, onMount, Show } from "solid-js"
import { Song } from "../utils/types"
import { backend_host } from "../utils/query"
import { FullScreenPlayer } from "./FullScreenPlayer"

export function Player()
{
	const [queue, setQueue] = createSignal<Song[]>([])
	const [idx, setIdx] = createSignal(0)
	const [loading, setLoading] = createSignal(false)
	const [openFullScreen, setOpenFullScreen] = createSignal(false)

	const currentSong = createMemo(() =>
	{
		const q = queue()
		const i = idx()

		if (q.length === 0) return null

		return q[i]
	})
	const hasNext = createMemo(() => idx() < queue().length - 1)

	const [playing, setPlaying] = createSignal(false)

	const imgUrl = createMemo(() =>
	{
		const song = currentSong()
		if (song === null) return ""
		return `${backend_host}/covers/${song.albumId}`
	})
	createEffect(() =>
	{
		if (openFullScreen())
		{
			document.body.style.overflow = "hidden"
		}
		else
		{
			document.body.style.overflow = "auto"
		}
	})

	let currentSound: Howl | null = null

	function play()
	{
		const songId = currentSong()?.id
		if (songId === undefined) return

		const url = `https://navidrome.araozu.dev/rest/stream.view?id=${songId}&v=1.13.0&c=music-to-go&u=fernando&s=49805d&t=4148cd1c83ae1bd01334facf4e70a947`

		currentSound?.stop()
		currentSound = new Howl({
			src: url,
			html5: true,
		})

		setLoading(true)
		currentSound.play()

		// update state once playing starts
		currentSound.once("load", () =>
		{
			setPlaying(true)
			setLoading(false)
		})

		// auto play next sond
		currentSound.once("end", () =>
		{
			setPlaying(false)
			next()
		})
	}

	function stop()
	{
		currentSound?.stop()
		currentSound?.unload()
		currentSound = null
		setPlaying(false)
	}

	function next()
	{
		if (!hasNext()) return

		stop()
		setIdx((x) => x + 1)
		play()
	}

	onMount(() =>
	{
		window.addEventListener("queue_and_play", ({ detail }) =>
		{
			setQueue(detail.queue)
			setIdx(detail.idx)
			play()
		})
	})

	onCleanup(() =>
	{
		currentSound?.stop()
		currentSound?.unload()
	})

	return (
		<>
			<div
				class="fixed bottom-0 bg-c-surface text-c-on-surface w-vw grid grid-cols-[3.5rem_auto_3rem_3rem] h-14 items-center"
				border="t-2 c-border-1"
			>
				<div class="flex justify-center items-center">
					<div
						class="inline-block h-12 w-12 bg-sky-200 dark:bg-sky-700 rounded"
					>
						<img class="rounded" id="music-player-img" src={imgUrl()} />
					</div>
				</div>
				<div
					class="px-1"
					onClick={() =>
					{
						if (currentSong() === null) return

						setOpenFullScreen(true)
					}}
				>
					<p
						class="font-display overflow-hidden overflow-ellipsis whitespace-nowrap w-full"
					>
						{currentSong()?.title ?? "-"}
					</p>
					<p
						class="text-sm opacity-75 overflow-hidden overflow-ellipsis whitespace-nowrap w-full"
					>
						{currentSong()?.artist ?? "-"}
					</p>
				</div>
				<Show when={!playing()}>
					<button
						class="flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed h-14"
						onClick={() =>
						{
							currentSound?.play()
							setPlaying(true)
						}}
					>
						<Play size={28} weight="fill" />
					</button>
				</Show>
				<Show when={playing()}>
					<button
						class="flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed h-14"
						onClick={() =>
						{
							currentSound?.pause()
							setPlaying(false)
						}}
					>
						<Pause size={28} weight="fill" />
					</button>
				</Show>
				<button
					class="flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed h-14"
					disabled={!hasNext()}
					onClick={() => next()}
				>
					<SkipForward size={28} weight="fill" />
				</button>
			</div>
			<Show when={openFullScreen()}>
				<FullScreenPlayer song={currentSong()!} />
			</Show>
		</>
	)
}
