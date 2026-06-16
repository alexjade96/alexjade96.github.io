import type { Blog } from '$lib/types'
import { getBlogs } from '$lib/api/blogs';

export async function load() {
	const blogs = await getBlogs();
	return { blogs };
}

// export async function load({ fetch }) {
// 	const response = await fetch('./projects/api')
// 	const projects: Project[] = await response.json()

// 	projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

// 	// Reverse below
// 	// projects.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

// 	return { projects }
// }

export const prerender = true;
