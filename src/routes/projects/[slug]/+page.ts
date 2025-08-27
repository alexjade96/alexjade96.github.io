import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const project = await import(`$lib/content/projects/${params.slug}.md`)

		return {
			content: project.default,
			meta: project.metadata
		}
	} catch (e) {
		console.error(`Error loading project ${params.slug}:`, e)
		throw error(404, `Could not find ${params.slug}`)
	}
}

export const prerender = true;
