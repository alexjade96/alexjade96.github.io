import type { PageServerLoad } from './$types.js';
import { stat } from 'fs/promises';
import path from 'path';
import resumeData from '$lib/resume-data.json';

export const prerender = true;

export const load: PageServerLoad = async () => {
	let lastModified: string | null = null;

	try {
		const filePath = path.resolve('static/resume_ayeh.pdf');
		const stats = await stat(filePath);
		lastModified = new Date(stats.mtime).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	} catch {
		lastModified = null;
	}

	return { lastModified, resumeData };
};
