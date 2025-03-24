import { Play, SkipForward } from "phosphor-solid"

export function Player()
{
	return (
		<div
			class="fixed bottom-0 bg-c-surface text-c-on-surface w-vw grid grid-cols-[3.5rem_auto_3rem_3rem] h-14 items-center"
			border="t-2 c-border-1"
		>
			<div class="flex justify-center items-center">
				<div
					class="inline-block h-12 w-12 bg-sky-200 dark:bg-sky-700 rounded"
				>
					<img class="rounded" id="music-player-img" />
				</div>
			</div>
			<div class="px-1">
				<p
					class="font-display overflow-hidden overflow-ellipsis whitespace-nowrap w-full"
				>
					Song
				</p>
				<p
					class="text-sm opacity-75 overflow-hidden overflow-ellipsis whitespace-nowrap w-full"
				>
					Artist
				</p>
			</div>
			<div class="flex justify-center items-center">
				<button class="inline-block py-3 px-3">
					<Play size={28} weight="fill" />
				</button>
			</div>
			<div class="flex justify-center items-center">
				<button class="inline-block py-3 px-3">
					<SkipForward size={28} weight="fill" />
				</button>
			</div>
		</div>
	)
}
