import type { PageServerLoad } from './$types.js';
import { stat } from 'fs/promises';
import path from 'path';

export const prerender = true;

export const load: PageServerLoad = async () => {
  let lastModified: string | null = null;

  try {
    const filePath = path.resolve('static/resume_ayeh.pdf');
    const stats = await stat(filePath);
    lastModified = stats.mtime.toISOString();
  } catch (err) {
    console.log('Error fetching last modified time:', err);
    lastModified = null;
  }

  return {
    lastModified: lastModified,
    pdfUrl: '/resume_ayeh.pdf'
  };
};
