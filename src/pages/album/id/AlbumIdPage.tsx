import { useParams, useSearchParams } from "@solidjs/router"
import { createSignal, onMount } from "solid-js"
import { backend_host } from "../../../utils/query"

export function AlbumIdPage()
{
	const params = useParams()
	const [searchParams] = useSearchParams()
	const id = params.id
	const albumName = searchParams.name

	const [imgLoaded, setImgLoaded] = createSignal(false)
	const imgOpacity = () => (imgLoaded() ? "opacity-100" : "opacity-0")

	onMount(async() =>
	{
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
			<p
				class="opacity-50"
				text="center xs"
			>
				({id})
			</p>
		</div>
	)
}
