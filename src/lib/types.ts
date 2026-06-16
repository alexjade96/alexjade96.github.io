import { getAllCategories } from './categories';
// export type Categories = 'sveltekit' | 'svelte' | 'tutorial' | 'project'

export type Project = {
	title: string
	slug: string
	description: string
	date: string
	// categories: Categories[]
	categories: string[]
	published: boolean
}

import { getAllBlogCategories } from './categories';

export type Blog = {
	title: string
	slug: string
	description: string
	date: string
	// categories: Categories[]
	categories: string[]
	published: boolean
}