export function Input(props: {
	id?: string,
	name?: string,
	type?: string,
	placeholder: string,
})
{
	return (
		<input
			class="bg-c-surface text-c-on-surface border-2 border-transparent rounded focus:border-c-primary p-2 inline-block w-full"
			style={{ "outline": "none" }}
			placeholder={props.placeholder}
			id={props.id}
			name={props.name}
			type={props.type}
		/>
	)
}
