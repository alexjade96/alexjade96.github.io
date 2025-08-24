import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki'
import sveltexPreprocessor from './sveltex.config.js';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await createHighlighter({
				themes: ['poimandres', 'dark-plus'],
				langs: ['svelte', 'javascript', 'typescript', 'css', 'html']
			})
			await highlighter.loadLanguage('javascript', 'typescript')
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'dark-plus' }))
			return `{@html \`${html}\` }`
		}
	},
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(), mdsvex(mdsvexOptions)], //, sveltexPreprocessor],
	kit: { 
		adapter: adapter(),
		prerender: {
			entries: [
				'/projects/github-pages',
				'/projects/second-project',
			]
		}
	 },
	extensions: ['.svelte', '.svx', '.md', '.sveltex'],
};

export default config;
