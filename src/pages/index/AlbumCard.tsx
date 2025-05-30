import { A } from "@solidjs/router"
import { backend_host } from "../../utils/query"
import { createSignal } from "solid-js"
import { Album } from "../../utils/types"

export function AlbumCard(props: { album: Album })
{
	const [imgLoaded, setImgLoaded] = createSignal(false)
	const imgOpacity = () => (imgLoaded() ? "opacity-100" : "opacity-0")

	return (
		<div class="inline-block p-1 rounded bg-zinc-800">
			<div class="h-40 w-28 relative">
				<div class="text-center">
					<img
						class={`inline-block w-[6.75rem] h-[6.75rem] min-h-26 overflow-hidden rounded transition-opacity ${imgOpacity()}`}
						src={`${backend_host}/covers/${props.album.id}`}
						onLoad={() => setImgLoaded(true)}
					/>
				</div>
				<p>
					<A
						href={`/album/${props.album.id}?name=${encodeURIComponent(props.album.name)}`}
						class="inline-block w-full overflow-hidden whitespace-nowrap overflow-ellipsis hover:underline"
					>
						{props.album.name}
					</A>
				</p>
				<p>
					<A
						href={`/artist/${props.album.artistId}`}
						class="inline-block w-full overflow-hidden whitespace-nowrap overflow-ellipsis hover:underline text-sm"
					>
						{props.album.artist}
					</A>
				</p>
			</div>
		</div>
	)
}

export function AlbumCardSkeleton()
{
	return (
		<div class="inline-block p-1 rounded bg-zinc-800">
			<div class="h-40 w-28 relative">
				<div class="text-center">
					<img
						class="inline-block w-[6.75rem] h-[6.75rem] min-h-26 overflow-hidden rounded opacity-0"
					/>
				</div>
				<p>
					<span
						class="inline-block w-full overflow-hidden whitespace-nowrap overflow-ellipsis hover:underline"
					>
						&nbsp;
					</span>
				</p>
				<p>
					<span
						class="inline-block w-full overflow-hidden whitespace-nowrap overflow-ellipsis hover:underline text-sm"
					>
						&nbsp;
					</span>
				</p>
			</div>
		</div>
	)
}
