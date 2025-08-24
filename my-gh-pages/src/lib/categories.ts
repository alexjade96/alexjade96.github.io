import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectDir = '$lib/content/projects'

export function getAllCategories(): string[] {
	const files = fs.readdirSync(projectDir)

	const categories = files.flatMap(file => {
		const raw = fs.readFileSync(`${projectDir}/${file}`, 'utf-8')
		const { data } = matter(raw)
		return data.categories || []
	})

	return Array.from(new Set(categories))
}