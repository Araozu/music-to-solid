import { Input } from "../components/input"
import { fetch_api } from "../utils/query"

export function LoginPage()
{
	async function onSubmit(ev: SubmitEvent)
	{
		fetch_api("/login", {
			method: "post",
		})
		ev.preventDefault()
		console.log("loggin :D (submit)")
	}

	return (
		<div>
			<h1 class="font-bold">
				Login to Reezer
			</h1>

			<form class="text-white" onSubmit={onSubmit}>
				<div class="px-4">
					<label for="login-username">Username:</label>
					<br />
					<Input id="login-username" name="username" type="text"
						placeholder="Username"
					/>
				</div>
				<div class="px-4">
					<label for="login-password">Password:</label>
					<br />
					<Input id="login-password"
						name="username"
						type="password"
						placeholder="Password"
					/>
				</div>
				<button type="submit">
					Log in
				</button>
			</form>
		</div>
	)
}
