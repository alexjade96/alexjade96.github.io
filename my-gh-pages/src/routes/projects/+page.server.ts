import type { Project } from '$lib/types'
import { getProjects } from '$lib/api/projects';

export async function load() {
	const projects = await getProjects();
	return { projects };
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
