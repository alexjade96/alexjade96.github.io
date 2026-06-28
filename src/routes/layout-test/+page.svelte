<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { Project, Blog } from '$lib/types';

	let { data }: { data: { projects: Project[]; blogs: Blog[] } } = $props();

	const projects = [...data.projects].reverse();
	const blogs = [...data.blogs];
	const featured = projects.slice(0, 3);
	const primary = projects[0];
	const secondary = projects.slice(1, 3);

	type TimelineEntry = { type: 'project'; item: Project } | { type: 'blog'; item: Blog };
	const timeline: TimelineEntry[] = [
		...projects.map(p => ({ type: 'project' as const, item: p })),
		...blogs.map(b => ({ type: 'blog' as const, item: b }))
	].sort((a, b) => new Date(b.item.date).getTime() - new Date(a.item.date).getTime()).slice(0, 6);

	const techStack = ['Python', 'SvelteKit', 'PyTorch', 'FastAPI', 'SQLite', 'TypeScript', 'Drizzle ORM', 'HuggingFace'];

	const bio = `Software engineer with a focus on data pipelines, ML, and full-stack web development. I build things with Python, SvelteKit, and PyTorch.`;

	// Composer
	let selectedLayout = $state(1);
	let selectedStyle  = $state('C');
	const composerLayouts = [
		{ id: 1, label: '1 · Strips' },
		{ id: 2, label: '2 · No hero' },
		{ id: 3, label: '3 · Bento' },
		{ id: 4, label: '4 · Sidebar' },
		{ id: 5, label: '5 · Skills' },
		{ id: 6, label: '6 · Currently' },
	];
	const composerStyles = [
		{ id: 'A', label: 'A · Cards' },
		{ id: 'B', label: 'B · Hero+2' },
		{ id: 'C', label: 'C · H-list' },
		{ id: 'D', label: 'D · Timeline' },
		{ id: 'E', label: 'E · Spotlight' },
	];
	const styleApplies = $derived(selectedLayout !== 3);
</script>

{#snippet projectDisplay()}
	{#if selectedStyle === 'A'}
		<ul class="card-grid">
			{#each featured as project}
				<li>
					<a href={`/projects/${project.slug}`} class="card-link">
						<article class="card">
							<div class="card-body"><h4>{project.title}</h4><p>{project.description}</p></div>
							<footer class="card-footer">
								<span class="date">{formatDate(project.date)}</span>
								<div class="tags">{#each project.categories.slice(0,3) as cat}<span class="tag">{cat}</span>{/each}</div>
							</footer>
						</article>
					</a>
				</li>
			{/each}
		</ul>
	{:else if selectedStyle === 'B'}
		<div class="bento-projects">
			<a href={`/projects/${primary.slug}`} class="card-link primary-card">
				<article class="card">
					<div class="card-body"><h4>{primary.title}</h4><p>{primary.description}</p></div>
					<footer class="card-footer">
						<span class="date">{formatDate(primary.date)}</span>
						<div class="tags">{#each primary.categories.slice(0,4) as cat}<span class="tag">{cat}</span>{/each}</div>
					</footer>
				</article>
			</a>
			<div class="secondary-cards">
				{#each secondary as project}
					<a href={`/projects/${project.slug}`} class="card-link">
						<article class="card">
							<div class="card-body"><h4>{project.title}</h4><p>{project.description}</p></div>
							<footer class="card-footer">
								<span class="date">{formatDate(project.date)}</span>
								<div class="tags">{#each project.categories.slice(0,3) as cat}<span class="tag">{cat}</span>{/each}</div>
							</footer>
						</article>
					</a>
				{/each}
			</div>
		</div>
	{:else if selectedStyle === 'C'}
		<ul class="hlist">
			{#each featured as project}
				<li>
					<a href={`/projects/${project.slug}`} class="hlist-row">
						<div class="hlist-left">
							<span class="hlist-title">{project.title}</span>
							<p class="hlist-desc">{project.description}</p>
						</div>
						<div class="hlist-tags">{#each project.categories.slice(0,3) as cat}<span class="tag">{cat}</span>{/each}</div>
					</a>
				</li>
			{/each}
		</ul>
	{:else if selectedStyle === 'D'}
		<ol class="timeline">
			{#each timeline as entry}
				<li class="tl-item">
					<span class="tl-dot tl-{entry.type}"></span>
					<a
						href={entry.type === 'project' ? `/projects/${entry.item.slug}` : `/blog/${entry.item.slug}`}
						class="tl-link"
					>
						<span class="tl-badge {entry.type}">{entry.type === 'project' ? 'Project' : 'Post'}</span>
						<span class="tl-title">{entry.item.title}</span>
						<span class="tl-date">{formatDate(entry.item.date)}</span>
					</a>
				</li>
			{/each}
		</ol>
	{:else if selectedStyle === 'E'}
		<a href={`/projects/${primary.slug}`} class="spotlight-card">
			<div class="spotlight-body">
				<span class="spotlight-badge">Featured</span>
				<h3>{primary.title}</h3>
				<p>{primary.description}</p>
				<div class="tags">{#each primary.categories as cat}<span class="tag">{cat}</span>{/each}</div>
			</div>
			<span class="spotlight-arrow">→</span>
		</a>
		<div class="spotlight-secondary">
			{#each secondary as project}
				<a href={`/projects/${project.slug}`} class="spotlight-sec">
					<span class="spotlight-sec-title">{project.title}</span>
					<span class="spotlight-sec-desc">{project.description}</span>
					<span class="spotlight-sec-arrow">→</span>
				</a>
			{/each}
		</div>
	{/if}
	<div class="view-all"><a href="/projects">View all →</a></div>
{/snippet}

<div class="test-page">
	<header class="test-header">
		<h1>Layout Test Page <span class="badge">DEV ONLY</span></h1>
		<p>Scroll through each variant to compare. All use real site data.</p>
	</header>

	<!-- ─────────────────────────────────────────────────────────── -->
	<!-- COMPOSER                                                     -->
	<!-- ─────────────────────────────────────────────────────────── -->

	<section class="variant">
		<div class="variant-label">Composer — pick layout + style <span class="badge-new">LIVE</span></div>
		<div class="composer-controls">
			<div class="picker-group">
				<span class="picker-label">Layout</span>
				<div class="picker-chips">
					{#each composerLayouts as layout}
						<button
							class="picker-chip"
							class:active={selectedLayout === layout.id}
							onclick={() => (selectedLayout = layout.id)}
						>{layout.label}</button>
					{/each}
				</div>
			</div>
			<div class="picker-group">
				<span class="picker-label">
					Project Style
					{#if !styleApplies}<em class="picker-note">(built-in for bento)</em>{/if}
				</span>
				<div class="picker-chips">
					{#each composerStyles as style}
						<button
							class="picker-chip"
							class:active={selectedStyle === style.id}
							disabled={!styleApplies}
							onclick={() => (selectedStyle = style.id)}
						>{style.label}</button>
					{/each}
				</div>
			</div>
		</div>
		<div class="demo composer-preview">
			{#if selectedLayout === 1}
				<div class="hero">
					<h2>Alex Yeh</h2>
					<p class="hero-sub">{bio}</p>
					<div class="hero-ctas">
						<a href="/projects" class="btn-primary">View Projects</a>
					</div>
				</div>
				<div class="side-by-side strip">
					<div class="side">
						<h3 class="strip-heading">About Me</h3>
						<p class="about-text">{bio}</p>
					</div>
					<div class="side">
						<h3 class="strip-heading">Latest Posts</h3>
						<ul class="blog-strip">
							{#each blogs as blog}
								<li><a href={`/blog/${blog.slug}`} class="blog-row">
									<span class="blog-title">{blog.title}</span>
									<span class="blog-date">{formatDate(blog.date)}</span>
								</a></li>
							{/each}
						</ul>
						<a href="/blog" class="strip-link">View all posts →</a>
					</div>
				</div>
				<div class="strip">
					<h3 class="strip-heading">Latest Projects</h3>
					{@render projectDisplay()}
				</div>
			{:else if selectedLayout === 2}
				<div class="nohero-header">
					<span class="nohero-name">Alex Yeh</span>
					<span class="nohero-tagline">Software engineer · Data pipelines · ML · Web</span>
				</div>
				<h3 class="strip-heading" style="margin-bottom:var(--size-5)">Latest Projects</h3>
				{@render projectDisplay()}
			{:else if selectedLayout === 3}
				<div class="hero">
					<h2>Alex Yeh</h2>
					<p class="hero-sub">{bio}</p>
					<div class="hero-ctas">
						<a href="/projects" class="btn-primary">View Projects</a>
					</div>
				</div>
				<div class="bento">
					<a href={`/projects/${primary.slug}`} class="bento-tile bento-large">
						<div class="bento-label">Featured Project</div>
						<h3>{primary.title}</h3>
						<p>{primary.description}</p>
						<div class="tags" style="margin-top:auto">
							{#each primary.categories.slice(0,4) as cat}<span class="tag">{cat}</span>{/each}
						</div>
					</a>
					<a href="/about" class="bento-tile bento-bio">
						<div class="bento-label">About</div>
						<p>{bio}</p>
					</a>
					{#if blogs[0]}
						<a href={`/blog/${blogs[0].slug}`} class="bento-tile bento-post">
							<div class="bento-label">Latest Post</div>
							<h4>{blogs[0].title}</h4>
							<span class="date">{formatDate(blogs[0].date)}</span>
						</a>
					{/if}
					<a href="/resume" class="bento-tile bento-resume">
						<div class="bento-label">Resume</div>
						<span class="resume-cta">View →</span>
					</a>
					{#each secondary as project}
						<a href={`/projects/${project.slug}`} class="bento-tile bento-small">
							<div class="bento-label">Project</div>
							<h4>{project.title}</h4>
							<p>{project.description}</p>
						</a>
					{/each}
				</div>
			{:else if selectedLayout === 4}
				<div class="sidebar-layout">
					<aside class="sidebar">
						<h2>Alex Yeh</h2>
						<p class="sidebar-bio">{bio}</p>
						<a href="/contact" class="strip-link">Get in touch →</a>
						<div class="sidebar-stack">
							{#each techStack as tech}<span class="tag">{tech}</span>{/each}
						</div>
					</aside>
					<div class="sidebar-main">
						<section class="sb-section">
							<h3 class="strip-heading">Latest Projects</h3>
							{@render projectDisplay()}
						</section>
						<section class="sb-section">
							<h3 class="strip-heading">Latest Posts</h3>
							<ul class="blog-strip">
								{#each blogs as blog}
									<li><a href={`/blog/${blog.slug}`} class="blog-row">
										<span class="blog-title">{blog.title}</span>
										<span class="blog-date">{formatDate(blog.date)}</span>
									</a></li>
								{/each}
							</ul>
						</section>
					</div>
				</div>
			{:else if selectedLayout === 5}
				<div class="hero">
					<h2>Alex Yeh</h2>
					<p class="hero-sub">{bio}</p>
					<div class="hero-ctas">
						<a href="/projects" class="btn-primary">View Projects</a>
					</div>
				</div>
				<div class="strip skills-strip">
					<div class="skills-row">
						{#each techStack as tech}<span class="skill-chip">{tech}</span>{/each}
					</div>
				</div>
				<div class="strip">
					<h3 class="strip-heading">Latest Projects</h3>
					{@render projectDisplay()}
				</div>
			{:else if selectedLayout === 6}
				<div class="hero">
					<h2>Alex Yeh</h2>
					<p class="hero-sub">{bio}</p>
					<p class="currently">
						<span class="currently-dot"></span>
						Currently: improving the League of Legends match analyzer with LLM-powered summaries
					</p>
					<div class="hero-ctas">
						<a href="/projects" class="btn-primary">View Projects</a>
					</div>
				</div>
				<div class="side-by-side strip">
					<div class="side">
						<h3 class="strip-heading">About Me</h3>
						<p class="about-text">{bio}</p>
					</div>
					<div class="side">
						<h3 class="strip-heading">Latest Posts</h3>
						<ul class="blog-strip">
							{#each blogs as blog}
								<li><a href={`/blog/${blog.slug}`} class="blog-row">
									<span class="blog-title">{blog.title}</span>
									<span class="blog-date">{formatDate(blog.date)}</span>
								</a></li>
							{/each}
						</ul>
						<a href="/blog" class="strip-link">View all posts →</a>
					</div>
				</div>
				<div class="strip">
					<h3 class="strip-heading">Latest Projects</h3>
					{@render projectDisplay()}
				</div>
			{/if}
		</div>
	</section>

</div>

<style>
	/* ── Page chrome ── */
	.test-page {
		display: flex;
		flex-direction: column;
		gap: var(--size-9);
	}

	.test-header {
		border-bottom: 2px dashed var(--border);
		padding-bottom: var(--size-5);

		h1 { margin-bottom: var(--size-2); }
		p  { color: var(--text-2); }
	}

	.badge {
		background: var(--red-6);
		border-radius: var(--radius-2);
		color: white;
		font-size: var(--font-size-00);
		font-weight: 600;
		letter-spacing: 0.05em;
		padding: 2px var(--size-2);
		vertical-align: middle;
	}

	.variant {
		border: 1px dashed var(--border);
		border-radius: var(--radius-3);
		overflow: hidden;
	}

	.variant-label {
		background: var(--surface-2);
		border-bottom: 1px dashed var(--border);
		color: var(--text-2);
		font-size: var(--font-size-0);
		font-weight: 600;
		letter-spacing: 0.04em;
		padding: var(--size-2) var(--size-5);
		text-transform: uppercase;
	}

	.demo { padding: var(--size-7); }

	/* ── Shared ── */
	.section-heading, .strip-heading {
		font-size: var(--font-size-3);
		font-weight: 700;
		margin-bottom: var(--size-5);
	}

	.view-all {
		margin-top: var(--size-5);
		a { color: var(--link); font-size: var(--font-size-0); }
	}

	.tags { display: flex; flex-wrap: wrap; gap: var(--size-1); }

	.tag {
		background: var(--surface-3);
		border-radius: var(--radius-2);
		color: var(--text-2);
		font-size: var(--font-size-00);
		padding: 2px var(--size-2);
	}

	.date { color: var(--text-2); font-size: var(--font-size-00); }

	.btn-primary {
		background: var(--link);
		border-radius: var(--radius-2);
		color: white;
		font-weight: 600;
		padding: var(--size-2) var(--size-5);
		text-decoration: none;
	}

	.btn-secondary {
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-2);
		color: var(--text-1);
		font-weight: 600;
		padding: var(--size-2) var(--size-5);
		text-decoration: none;
	}

	/* ── Hero ── */
	.hero {
		margin-bottom: var(--size-9);
		max-width: 60ch;

		h2 { font-size: var(--font-size-fluid-3); font-weight: 800; margin-bottom: var(--size-3); }
	}

	.hero-sub { color: var(--text-2); line-height: var(--font-lineheight-3); margin-bottom: var(--size-5); }
	.hero-ctas { display: flex; gap: var(--size-4); flex-wrap: wrap; }

	/* ── C: horizontal list ── */
	.hlist {
		border: 1px solid var(--border);
		border-radius: var(--radius-3);
		display: flex;
		flex-direction: column;
		overflow: hidden;

		li:not(:last-child) { border-bottom: 1px solid var(--border); }
	}

	.hlist-row {
		align-items: center;
		color: inherit;
		display: flex;
		gap: var(--size-5);
		justify-content: space-between;
		padding: var(--size-4) var(--size-5);
		text-decoration: none;
		transition: background 0.15s;

		&:hover { background: var(--surface-2); }
	}

	.hlist-left { display: flex; flex-direction: column; gap: var(--size-1); min-width: 0; }
	.hlist-title { font-weight: 600; }
	.hlist-desc { color: var(--text-2); font-size: var(--font-size-0); }
	.hlist-tags { display: flex; flex-shrink: 0; flex-wrap: wrap; gap: var(--size-1); justify-content: flex-end; }

	/* ── Side-by-side ── */
	.side-by-side {
		display: grid;
		gap: var(--size-8);
		grid-template-columns: 1fr 1fr;

		@media (max-width: 640px) { grid-template-columns: 1fr; }
	}

	.side { display: flex; flex-direction: column; gap: var(--size-3); }
	.about-text { color: var(--text-2); line-height: var(--font-lineheight-3); }
	.strip-link { color: var(--link); font-size: var(--font-size-0); text-decoration: none; width: fit-content; }

	/* ── A: card grid ── */
	.card-grid {
		display: grid;
		gap: var(--size-4);
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	}

	.card-link {
		color: inherit;
		display: flex;
		text-decoration: none;
		width: 100%;

		&:hover .card { border-color: var(--link); box-shadow: var(--shadow-3); translate: 0 -2px; }
	}

	.card {
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-3);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: var(--size-4);
		transition: border-color 0.15s, box-shadow 0.15s, translate 0.15s;
		width: 100%;

		h4 { font-weight: 600; margin-bottom: var(--size-2); }
		p  { color: var(--text-2); font-size: var(--font-size-0); line-height: var(--font-lineheight-3); }
	}

	.card-body { flex: 1; }

	.card-footer {
		border-top: 1px solid var(--border);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--size-2);
		justify-content: space-between;
		margin-top: var(--size-3);
		padding-top: var(--size-2);
	}

	/* ── B: hero card + 2 smaller ── */
	.bento-projects {
		display: grid;
		gap: var(--size-4);
		grid-template-columns: 1fr 1fr;

		.primary-card {
			grid-column: 1;
			grid-row: span 2;
			.card { height: 100%; }
			h4 { font-size: var(--font-size-2); }
		}

		.secondary-cards {
			display: flex;
			flex-direction: column;
			gap: var(--size-4);
			grid-column: 2;
		}
	}

	/* ── Layout 1: strips ── */
	.strip {
		border-top: 1px solid var(--border);
		margin-top: var(--size-8);
		padding-top: var(--size-7);
	}

	.about-strip {
		p { color: var(--text-2); line-height: var(--font-lineheight-3); margin-bottom: var(--size-3); }
		a { color: var(--link); }
	}

	.blog-strip { display: flex; flex-direction: column; gap: var(--size-2); }

	.blog-row {
		align-items: center;
		color: inherit;
		display: flex;
		gap: var(--size-4);
		justify-content: space-between;
		padding: var(--size-2) 0;
		text-decoration: none;

		&:hover .blog-title { color: var(--link); }
	}

	.blog-title { font-weight: 500; }
	.blog-date  { color: var(--text-2); flex-shrink: 0; font-size: var(--font-size-00); }

	/* ── Layout 3: bento ── */
	.bento {
		display: grid;
		gap: var(--size-4);
		grid-template-columns: repeat(3, 1fr);
	}

	.bento-tile {
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-3);
		color: inherit;
		display: flex;
		flex-direction: column;
		gap: var(--size-2);
		padding: var(--size-5);
		text-decoration: none;
		transition: border-color 0.15s, box-shadow 0.15s;

		&:hover { border-color: var(--link); box-shadow: var(--shadow-3); }

		h3, h4 { font-weight: 600; }
		p { color: var(--text-2); font-size: var(--font-size-0); line-height: var(--font-lineheight-3); }
	}

	.bento-label {
		color: var(--text-2);
		font-size: var(--font-size-00);
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.bento-large  { grid-column: span 2; grid-row: span 2; }
	.bento-bio    { grid-column: 3; }
	.bento-post   { grid-column: 3; }
	.bento-resume { align-items: center; grid-column: 1; justify-content: center; text-align: center; }

	.resume-cta { font-size: var(--font-size-5); font-weight: 700; }

	/* ── D: Timeline feed ── */
	.timeline { display: flex; flex-direction: column; }

	.tl-item {
		align-items: center;
		border-bottom: 1px solid var(--border);
		display: flex;
		gap: var(--size-4);
		padding: var(--size-3) 0;

		&:first-child { border-top: 1px solid var(--border); }
	}

	.tl-dot {
		border-radius: var(--radius-round);
		flex-shrink: 0;
		height: 8px;
		width: 8px;

		&.tl-project { background: var(--link); }
		&.tl-blog    { background: var(--green-6); }
	}

	.tl-link {
		align-items: center;
		color: inherit;
		display: flex;
		flex: 1;
		gap: var(--size-3);
		text-decoration: none;

		&:hover .tl-title { color: var(--link); }
	}

	.tl-badge {
		border-radius: var(--radius-2);
		flex-shrink: 0;
		font-size: var(--font-size-00);
		font-weight: 600;
		padding: 2px var(--size-2);

		&.project { background: color-mix(in srgb, var(--link) 15%, transparent); color: var(--link); }
		&.blog    { background: color-mix(in srgb, var(--green-6) 15%, transparent); color: var(--green-6); }
	}

	.tl-title { flex: 1; font-weight: 500; }
	.tl-date  { color: var(--text-2); flex-shrink: 0; font-size: var(--font-size-00); }

	/* ── E: Spotlight banner ── */
	.spotlight-card {
		align-items: center;
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-3);
		color: inherit;
		display: flex;
		gap: var(--size-5);
		justify-content: space-between;
		padding: var(--size-6);
		text-decoration: none;
		transition: border-color 0.15s, box-shadow 0.15s;

		&:hover { border-color: var(--link); box-shadow: var(--shadow-3); }

		h3 { font-size: var(--font-size-3); font-weight: 700; margin-bottom: var(--size-2); }
		p  { color: var(--text-2); line-height: var(--font-lineheight-3); margin-bottom: var(--size-3); }
	}

	.spotlight-body  { display: flex; flex-direction: column; flex: 1; }
	.spotlight-arrow { color: var(--text-2); flex-shrink: 0; font-size: var(--font-size-5); }

	.spotlight-badge {
		background: color-mix(in srgb, var(--link) 15%, transparent);
		border-radius: var(--radius-2);
		color: var(--link);
		font-size: var(--font-size-00);
		font-weight: 700;
		letter-spacing: 0.06em;
		margin-bottom: var(--size-3);
		padding: 2px var(--size-2);
		text-transform: uppercase;
		width: fit-content;
	}

	.spotlight-secondary {
		border: 1px solid var(--border);
		border-radius: var(--radius-3);
		display: flex;
		flex-direction: column;
		margin-top: var(--size-3);
		overflow: hidden;
	}

	.spotlight-sec {
		align-items: center;
		color: inherit;
		display: flex;
		gap: var(--size-4);
		padding: var(--size-3) var(--size-4);
		text-decoration: none;
		transition: background 0.15s;

		&:hover { background: var(--surface-2); }
		&:not(:last-child) { border-bottom: 1px solid var(--border); }
	}

	.spotlight-sec-title { flex-shrink: 0; font-weight: 600; min-width: 12ch; }
	.spotlight-sec-desc  { color: var(--text-2); flex: 1; font-size: var(--font-size-0); }
	.spotlight-sec-arrow { color: var(--text-2); flex-shrink: 0; }

	/* ── Layout 5: Asymmetric sidebar ── */
	.demo-sidebar {
		max-height: 520px;
		overflow-y: auto;
	}

	.sidebar-layout {
		align-items: start;
		display: grid;
		gap: var(--size-8);
		grid-template-columns: 200px 1fr;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: var(--size-5);
		position: sticky;
		top: 0;

		h2 { font-size: var(--font-size-3); font-weight: 800; }
	}

	.sidebar-bio   { color: var(--text-2); font-size: var(--font-size-0); line-height: var(--font-lineheight-3); }
	.sidebar-stack { display: flex; flex-wrap: wrap; gap: var(--size-1); }

	.sidebar-nav {
		display: flex;
		flex-direction: column;
		gap: var(--size-2);

		a { color: var(--text-2); font-size: var(--font-size-0); text-decoration: none; &:hover { color: var(--link); } }
	}

	.sidebar-main { display: flex; flex-direction: column; gap: var(--size-7); }

	.sb-section {
		border-top: 1px solid var(--border);
		padding-top: var(--size-6);

		&:first-child { border-top: none; padding-top: 0; }
	}

	/* ── Layout 6: No hero ── */
	.nohero-header {
		align-items: baseline;
		border-bottom: 1px solid var(--border);
		display: flex;
		gap: var(--size-4);
		margin-bottom: var(--size-7);
		padding-bottom: var(--size-3);
	}

	.nohero-name    { font-size: var(--font-size-3); font-weight: 800; }
	.nohero-tagline { color: var(--text-2); font-size: var(--font-size-0); }

	/* ── Layout 7: Skills row ── */
	.skills-strip { margin-top: 0; }
	.skills-row { display: flex; flex-wrap: wrap; gap: var(--size-2); }

	.skill-chip {
		background: var(--surface-3);
		border: 1px solid var(--border);
		border-radius: var(--radius-round);
		color: var(--text-2);
		font-size: var(--font-size-0);
		font-weight: 500;
		padding: var(--size-1) var(--size-3);
	}

	/* ── Layout 8: Currently ── */
	.currently {
		align-items: center;
		color: var(--text-2);
		display: flex;
		font-size: var(--font-size-0);
		gap: var(--size-2);
		margin-bottom: var(--size-5);
	}

	.currently-dot {
		animation: pulse 2s ease-in-out infinite;
		background: var(--green-6);
		border-radius: var(--radius-round);
		display: inline-block;
		flex-shrink: 0;
		height: 8px;
		width: 8px;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0.4; }
	}

	/* ── Composer ── */
	.badge-new {
		background: var(--green-6);
		border-radius: var(--radius-2);
		color: white;
		font-size: var(--font-size-00);
		font-weight: 600;
		letter-spacing: 0.05em;
		padding: 2px var(--size-2);
		vertical-align: middle;
	}

	.composer-controls {
		background: var(--surface-2);
		border-bottom: 1px dashed var(--border);
		display: flex;
		flex-direction: column;
		gap: var(--size-5);
		padding: var(--size-5) var(--size-6);
	}

	.picker-group {
		display: flex;
		flex-direction: column;
		gap: var(--size-2);
	}

	.picker-label {
		color: var(--text-2);
		font-size: var(--font-size-0);
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.picker-note {
		font-size: var(--font-size-00);
		font-style: italic;
		font-weight: 400;
		letter-spacing: 0;
		margin-left: var(--size-2);
		text-transform: none;
	}

	.picker-chips { display: flex; flex-wrap: wrap; gap: var(--size-2); }

	.picker-chip {
		background: var(--surface-1);
		border: 1px solid var(--border);
		border-radius: var(--radius-2);
		color: var(--text-2);
		cursor: pointer;
		font: inherit;
		font-size: var(--font-size-0);
		padding: var(--size-1) var(--size-3);
		transition: border-color 0.1s, color 0.1s, background 0.1s;

		&:hover:not(:disabled) { border-color: var(--link); color: var(--text-1); }
		&.active { background: var(--link); border-color: var(--link); color: white; font-weight: 600; }
		&:disabled { cursor: not-allowed; opacity: 0.35; }
	}

	.composer-preview {
		max-height: 620px;
		overflow-y: auto;
	}

</style>
