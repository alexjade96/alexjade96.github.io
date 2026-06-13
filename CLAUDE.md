# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio/blog static site built with SvelteKit and deployed to GitHub Pages. The build output goes to `docs/` (not `build/`), which is the directory served by GitHub Pages.

## Commands

```bash
npm run dev          # Start dev server (also runs generate-meta.js first)
npm run build        # Production build → outputs to docs/
npm run rebuild      # Full clean build (deletes .svelte-kit and build dirs first)
npm run preview      # Preview the production build locally
npm run check        # Type-check with svelte-check
npm run check:watch  # Type-check in watch mode
npm run lint         # Prettier check + ESLint
npm run format       # Auto-format with Prettier
```

There is no test suite configured for this project.

## Architecture

### Content System

Projects are authored as Markdown files in `src/lib/content/projects/`. Each file's frontmatter maps to the `Project` type (`src/lib/types.ts`): `title`, `description`, `date`, `categories`, and `published`. Files with `published: false` are excluded from the site.

`src/lib/api/projects.ts` loads all project markdown files at build time using `import.meta.glob()`. The slug is derived from the filename.

New project slugs must also be added to the `prerender.entries` array in `svelte.config.js` since the site uses the static adapter.

### Rendering Pipeline

- `.md` files are processed by **mdsvex** (markdown → Svelte components)
- Code blocks are highlighted with **Shiki** using the `dark-plus` theme
- `.sveltex` extension exists for experimental math/extended markdown support (via `@nvl/sveltex`), but the sveltex preprocessor is currently commented out in `svelte.config.js`

### Routing

Standard SvelteKit file-based routing under `src/routes/`. The projects list page uses a `+page.server.ts` load function that calls `getProjects()`. Dynamic project detail pages are at `src/routes/projects/[slug]/`.

The site is fully prerendered — `+layout.ts` sets `prerender = true` globally and `trailingSlash = 'always'`.

### Styling

- **Tailwind CSS v4** (configured via `@tailwindcss/vite` plugin, stylesheet at `src/app.css`)
- **Open Props** for design tokens
- Prettier sorts Tailwind classes automatically via `prettier-plugin-tailwindcss`

### Code Style

- **Tabs** for indentation (not spaces)
- **Single quotes**, no trailing commas, print width 100
- Svelte 5 runes syntax (`$state`, `$props`, `$derived`) — not the legacy Options API
- ESLint uses flat config format (ESLint 9+)

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/config.ts` | Site metadata (title, URL, repo) |
| `src/lib/types.ts` | Shared TypeScript types |
| `src/lib/generate-meta.js` | Prebuild script that writes `static/site-meta.json` with a timestamp |
| `svelte.config.js` | Adapter config (output: `docs/`), mdsvex setup, prerender entries |
| `src/app.css` | Global styles — Tailwind entry point |
