import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const blog = await import(`$lib/content/blogs/${params.slug}.md`)

		return {
			content: blog.default,
			meta: blog.metadata
		}
	} catch (e) {
		console.error(`Error loading blog ${params.slug}:`, e)
		throw error(404, `Could not find ${params.slug}`)
	}
}

export const prerender = true;
