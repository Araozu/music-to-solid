import { Card } from "../components/card"
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
		<div class="p-1 flex items-center justify-center w-full h-[100vh]">
			<Card class="w-[90vw] max-w-128">
				<h1 font="bold" text="xl" class="pb-4">
					Login with Navidrome
				</h1>

				<form class="text-white" onSubmit={onSubmit}>
					<div class="my-2">
						<label for="login-navidrome">Navidrome URL:</label>
						<br />
						<Input id="login-navidrome" name="navidrome" type="text"
							placeholder="https://"
						/>
					</div>
					<div class="my-2">
						<label for="login-username">Username:</label>
						<br />
						<Input id="login-username" name="username" type="text"
							placeholder="Username"
						/>
					</div>
					<div class="my-2">
						<label for="login-password">Password:</label>
						<br />
						<Input id="login-password"
							name="username"
							type="password"
							placeholder="Password"
						/>
					</div>
					<button type="submit" class="bg-c-primary text-c-on-primary px-4 py-1 rounded font-bold">
						Log in
					</button>
				</form>
			</Card>
		</div>
	)
}
