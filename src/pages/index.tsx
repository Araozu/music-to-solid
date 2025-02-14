import { A } from "@solidjs/router"
import { Card } from "../components/card"

export function IndexPage()
{
	return (
		<div>
			<Navbar />
			<div class="m-1">
				<Card>
					<div>
						<h2 class="font-bold text-lg">Random Albums</h2>
					</div>
				</Card>
			</div>
			<div class="m-1">
				<Card>
					<div>
						<h2 class="font-bold text-lg">Most Played</h2>
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
			<A href="/" class="font-bold">
				MusicToGo
			</A>
		</nav>
	)
}
