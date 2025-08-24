import type { Project } from '$lib/types'

export async function load({ fetch }) {
	const response = await fetch('/api/projects')
	const projects: Project[] = await response.json()

	projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	// Reverse below
	// projects.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

	return { projects }
}