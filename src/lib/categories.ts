import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getAllCategories(): string[] {
	const projectDir = '$lib/content/projects'
	const files = fs.readdirSync(projectDir)

	const categories = files.flatMap(file => {
		const raw = fs.readFileSync(`${projectDir}/${file}`, 'utf-8')
		const { data } = matter(raw)
		return data.categories || []
	})

	return Array.from(new Set(categories))
}

export function getAllBlogCategories(): string[] {
	const blogDir = '$lib/content/blogs'
	const files = fs.readdirSync(blogDir)

	const categories = files.flatMap(file => {
		const raw = fs.readFileSync(`${blogDir}/${file}`, 'utf-8')
		const { data } = matter(raw)
		return data.categories || []
	})

	return Array.from(new Set(categories))
}