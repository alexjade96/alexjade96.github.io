import { getProjects } from '$lib/api/projects';
import { getBlogs } from '$lib/api/blogs';

export async function load() {
	const [projects, blogs] = await Promise.all([getProjects(), getBlogs()]);
	return { projects: projects.slice(0, 6), blogs: blogs.slice(0, 3) };
}

export const prerender = false;
