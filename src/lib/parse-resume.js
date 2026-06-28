import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

function stripTex(s) {
	return s
		.replace(/\\textbf\{([^}]*)\}/g, '$1')
		.replace(/\\textit\{([^}]*)\}/g, '$1')
		.replace(/\\emph\{([^}]*)\}/g, '$1')
		.replace(/\{\\bf\s+([^}]*)\}/g, '$1')
		.replace(/\{\\em\s+([^}]*)\}/g, '$1')
		.replace(/\{\\it\s+([^}]*)\}/g, '$1')
		.replace(/\\href\{[^}]*\}\{([^}]*)\}/g, '$1')
		.replace(/\\vspace\{[^}]*\}/g, '')
		.replace(/\\itemsep[^\n]*/g, '')
		.replace(/\\hfill/g, '  ')
		.replace(/\\\\/g, '')
		.replace(/[{}]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function parseItems(block) {
	const bullets = [];
	const re = /\\item\s+([\s\S]*?)(?=\\item|\\end\{itemize\}|$)/g;
	for (const m of block.matchAll(re)) {
		const text = stripTex(m[1]);
		if (text) bullets.push(text);
	}
	return bullets;
}

function parseEducation(body) {
	const entries = [];
	const re = /\{\\bf\s+([^}]+)\}\s*\\hfill\s*\{\\em\s+([^}]+)\}\s*\\\\\s*\n\s*([^\n]+)/g;
	for (const m of body.matchAll(re)) {
		const line3 = m[3];
		const noteMatch = line3.match(/\\hfill\s*\{\\em\s+([^}]+)\}/);
		const institution = line3.replace(/\s*\\hfill[\s\S]*$/, '').trim();
		entries.push({
			degree: m[1].trim(),
			date: m[2].trim(),
			institution: institution.trim(),
			note: noteMatch?.[1]?.trim() ?? null,
		});
	}
	return entries;
}

function parseExperience(body) {
	const entries = [];
	const headerRe = /\\textbf\{([^}]+)\}\s*\\hfill\s*\\textit\{([^}]+)\}\s*\\\\\s*\n([ \t]*[^\n\\{][^\n]*)/g;
	const headers = [...body.matchAll(headerRe)];
	for (let i = 0; i < headers.length; i++) {
		const h = headers[i];
		const chunkStart = h.index + h[0].length;
		const chunkEnd = headers[i + 1]?.index ?? body.length;
		entries.push({
			title: h[1].trim(),
			date: h[2].trim(),
			subtitle: stripTex(h[3]).trim(),
			bullets: parseItems(body.slice(chunkStart, chunkEnd)),
		});
	}
	return entries;
}

function parseProjects(body) {
	const entries = [];
	const headerRe = /\\textbf\{([^}]+)\}\s*\\hfill\s*\{\\em\s+([^}]+)\}\s*\\\\\s*\n/g;
	const headers = [...body.matchAll(headerRe)];
	for (let i = 0; i < headers.length; i++) {
		const h = headers[i];
		const chunkStart = h.index + h[0].length;
		const chunkEnd = headers[i + 1]?.index ?? body.length;
		entries.push({
			title: h[1].trim(),
			date: h[2].trim(),
			bullets: parseItems(body.slice(chunkStart, chunkEnd)),
		});
	}
	return entries;
}

function parseSkills(body) {
	const skills = [];
	const re = /\\textbf\{([^}]+)\}\s+([^\\{}\n]+)/g;
	for (const m of body.matchAll(re)) {
		skills.push({ category: m[1].trim(), items: m[2].replace(/\s+/g, ' ').trim() });
	}
	return skills;
}

function parse(tex) {
	// Strip line comments first so "% \begin{comment}" doesn't fool the block-comment regex
	let src = tex.replace(/%[^\n]*/g, '');
	src = src.replace(/\\begin\{comment\}[\s\S]*?\\end\{comment\}/g, '');

	const name = src.match(/\\name\{([^}]+)\}/)?.[1]?.trim() ?? '';

	const addrBlock = src.match(/\\address\{([\s\S]*?)\n\}/)?.[1] ?? '';
	const contact = [...addrBlock.matchAll(/\{([^}]+)\}/g)]
		.map(m => m[1].trim())
		.filter(Boolean);

	const sections = [];
	const sectionRe = /\\begin\{rSection\}\{([^}]+)\}([\s\S]*?)\\end\{rSection\}/g;
	for (const m of src.matchAll(sectionRe)) {
		const title = m[1].trim();
		const body = m[2];
		switch (title.toUpperCase()) {
			case 'PROFILE':
				sections.push({ title, type: 'text', content: stripTex(body) });
				break;
			case 'EDUCATION':
				sections.push({ title, type: 'education', entries: parseEducation(body) });
				break;
			case 'WORK EXPERIENCE':
				sections.push({ title, type: 'experience', entries: parseExperience(body) });
				break;
			case 'PROJECTS':
				sections.push({ title, type: 'projects', entries: parseProjects(body) });
				break;
			case 'SKILLS':
				sections.push({ title, type: 'skills', items: parseSkills(body) });
				break;
			default:
				sections.push({ title, type: 'text', content: stripTex(body) });
		}
	}

	return { name, contact, sections };
}

try {
	const tex = readFileSync(join(ROOT, 'static/resume.tex'), 'utf8');
	const data = parse(tex);
	writeFileSync(join(ROOT, 'src/lib/resume-data.json'), JSON.stringify(data, null, '\t'));
	console.log('✓ resume-data.json generated');
} catch (e) {
	if (e.code === 'ENOENT') {
		console.warn('⚠  static/resume.tex not found — skipping resume parse');
	} else {
		throw e;
	}
}
