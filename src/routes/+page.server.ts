import { getProjects } from '$lib/api/projects';
import { getBlogs } from '$lib/api/blogs';

export async function load() {
	const [projects, blogs] = await Promise.all([getProjects(), getBlogs()]);
	return {
		projects: projects.slice(-3).reverse(),
		blogs: blogs.slice(0, 3)
	};
}
