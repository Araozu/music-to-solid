import { A } from "@solidjs/router"
import { Album } from ".."
import { backend_host } from "../../utils/query"

export function AlbumCard(props: { album: Album })
{
	return (
		<div class="inline-block p-1 rounded bg-zinc-800">
			<div class="h-40 w-28 relative">
				<div class="text-center">
					<img
						class="inline-block w-[6.75rem] h-[6.75rem] min-h-26 overflow-hidden rounded"
						src={`${backend_host}/covers/${props.album.id}`}
					/>
				</div>
				<p>
					<a
						href={`/album/${props.album.id}`}
						class="inline-block w-full overflow-hidden whitespace-nowrap overflow-ellipsis hover:underline"
					>
						{props.album.name}
					</a>
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
