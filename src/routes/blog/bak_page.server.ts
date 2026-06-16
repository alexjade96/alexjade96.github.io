import type { Blog } from '$lib/types'

export async function load({ fetch }) {
	const response = await fetch('./blogs/api')
	const blogs: Blog[] = await response.json()

	blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	// Reverse below
	// projects.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

	return { blogs }
}

export const prerender = true;
