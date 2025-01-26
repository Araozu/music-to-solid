import { QueryClient } from "@tanstack/solid-query"

const backend_url = import.meta.env.VITE_BACKEND_URL

export async function fetch_api(url: string, options?: RequestInit)
{
	const response = await fetch(`${backend_url}${url}`, {
		credentials: "include",
		...options,
	})
	if (!response.ok) throw new Error("API error")
	return response.json()
}

export const query_client = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: ({ queryKey }) => fetch_api(queryKey[0]),
		},
	},
})
