import { JSX } from "solid-js"

type Props = { children: JSX.Element, class?: string };
export function Card(props: Props)
{
	return (
		<div class={`bg-c-surface-variant text-c-on-surface-variant p-2 rounded ${props.class}`}>
			{props.children}
		</div >
	)
}
