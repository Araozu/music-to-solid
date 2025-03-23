import { createSignal } from "solid-js"
import { Card } from "../components/card"
import { Input } from "../components/input"
import { fetch_api } from "../utils/query"
import z from "zod"
import { useNavigate } from "@solidjs/router"

const loginSchema = z.object({
	navidrome: z.string().min(1, { message: "Navidrome URL is required" }),
	username: z.string().min(1, { message: "Username is required" }),
	password: z.string().min(1, { message: "Password is required" }),
})

export function LoginPage()
{
	const [url, setUrl] = createSignal("")
	const [username, setUsername] = createSignal("")
	const [password, setPassword] = createSignal("")
	const [error, setError] = createSignal("")
	const [loading, setLoading] = createSignal(false)
	const navigate = useNavigate()

	async function onSubmit(ev: SubmitEvent)
	{
		ev.preventDefault()
		setError("")
		setLoading(true)

		const schemaRes = loginSchema.safeParse({
			navidrome: url(),
			username: username(),
			password: password(),
		})
		if (!schemaRes.success)
		{
			const err_message = schemaRes.error.errors.map((e) => e.message).join(", ")
			setError(err_message)
			setLoading(false)
			return
		}

		const [, err] = await fetch_api("/auth/login", {
			method: "post",
			body: JSON.stringify({
				url: url(),
				username: username(),
				password: password(),
			}),
		})

		if (err !== null)
		{
			setError(err.message)
			setLoading(false)
			return
		}

		setLoading(false)
		navigate("/")
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
						<Input
							id="login-navidrome" name="navidrome" type="text"
							placeholder="https://"
							value={url()}
							onInput={setUrl}
							disabled={loading()}
						/>
					</div>
					<div class="my-2">
						<label for="login-username">Username:</label>
						<br />
						<Input id="login-username" name="username" type="text"
							placeholder="Username"
							value={username()}
							onInput={setUsername}
							disabled={loading()}
						/>
					</div>
					<div class="my-2">
						<label for="login-password">Password:</label>
						<br />
						<Input id="login-password"
							name="username"
							type="password"
							placeholder="Password"
							value={password()}
							onInput={setPassword}
							disabled={loading()}
						/>
					</div>
					<div class="text-red-500 text-sm">
						{error()}
					</div>
					<button
						type="submit"
						class={`bg-c-primary text-c-on-primary px-4 py-1 rounded font-bold ${loading() ? "animate-pulse" : ""}`}
					>
						Log in
					</button>
				</form>
			</Card>
		</div>
	)
}
