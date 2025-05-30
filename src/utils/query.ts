import { QueryClient } from "@tanstack/solid-query"
import { Result } from "./result"

export const backend_host = import.meta.env.VITE_BACKEND_HOST
export const backend_url = `${backend_host}/api`

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

		let txt
		try
		{
			txt = await response.text()
		}
		catch
		{
			// @ts-expect-error allowing null
			return [null, null]
		}

		// @ts-expect-error allowing null
		if (txt === "") return [null, null]

		let json
		try
		{
			json = JSON.parse(txt)
		}
		catch
		{
			// @ts-expect-error allowing null
			return [txt, null]
		}

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
