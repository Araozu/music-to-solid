import { backend_host } from "../utils/query"
import { Song } from "../utils/types"

export function FullScreenPlayer(props: {
	song: Song,
})
{
	const imgUrl = () => `${backend_host}/covers/${props.song.albumId}`

	return (
		<div class="fixed top-0 left-0 w-screen h-screen z-50 bg-c-surface text-c-on-surface">
			<div
				class="absolute top-0 left-0 w-screen h-screen -z-1 opacity-75"
				bg="cover center"
				style={{ "background-image": `url(${imgUrl()})`, filter: "blur(40px)" }}
			/>

			<div class="absolute top-0 left-0 w-screen h-screen grid grid-rows-[auto_6rem]">
				<div class="flex justify-center items-center">
					<img class="rounded inline-block" id="music-player-img" src={imgUrl()} />
				</div>

				<div class="px-2">
					<p class="font-display font-semibold text-2xl mb-2">
						{props.song.title}
					</p>
					<p class="text-sm opacity-90 my-1">
						{props.song.album}
					</p>
					<p class="text-xs opacity-75">
						{props.song.artist}
					</p>
				</div>
			</div>
		</div>
	)
}
