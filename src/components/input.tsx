export function Input(props: {
	id?: string,
	name?: string,
	type?: string,
	placeholder: string,
	value: string,
	onInput: (v: string) => void,
	disabled?: boolean,
})
{
	return (
		<input
			class="bg-c-surface text-c-on-surface border-2 border-transparent rounded focus:border-c-primary p-2 inline-block w-full
			disabled:opacity-50 disabled:cursor-not-allowed"
			style={{ "outline": "none" }}
			placeholder={props.placeholder}
			id={props.id}
			name={props.name}
			type={props.type}
			value={props.value}
			onInput={(ev) => props.onInput((ev.target as HTMLInputElement).value)}
			disabled={props.disabled}
		/>
	)
}
