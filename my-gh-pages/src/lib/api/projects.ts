// src/lib/api/projects.ts
import type { Project } from '$lib/types';

export async function getProjects(): Promise<Project[]> {
	let projects: Project[] = []

	const paths = import.meta.glob('/src/lib/content/projects/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Project, 'slug'>
			const project = { ...metadata, slug } satisfies Project
			project.published && projects.push(project)
		}
	}

	projects = projects.sort((first, second) =>
    new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return projects
}
