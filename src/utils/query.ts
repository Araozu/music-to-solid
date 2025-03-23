import { QueryClient } from "@tanstack/solid-query"
import { Result } from "./result"

const backend_url = import.meta.env.VITE_BACKEND_URL

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FetchError<T = any> = {
	statusCode: number;
	message: string;
	error: T;
};

export async function fetch_api<Data>(url: string, options?: RequestInit)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	: Promise<Result<Data, FetchError<any>>>
{
	try
	{
		const response = await fetch(`${backend_url}${url}`, {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			...options,
		})

		if (!response.ok)
		{
			const txt = await response.text()
			const message = txt === "" ? response.statusText : txt

			let msg = {}
			try
			{
				msg = JSON.parse(txt)
			}
			catch
			{
				// empty
			}

			// @ts-expect-error allowing null
			return [null, {
				statusCode: response.status,
				message,
				error: msg,
			}]

		}

		const txt = await response.text()

		// @ts-expect-error allowing null
		if (txt === "") return [null, null]

		const json = JSON.parse(txt)

		return [json, null]
	}
	catch (e)
	{
		// @ts-expect-error allowing null
		return [null, {
			statusCode: 503,
			message: "Service Unavailable",
			error: e,
		}]
	}
}

export const query_client = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: ({ queryKey }) => fetch_api(queryKey[0]),
		},
	},
})
