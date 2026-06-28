<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { Project, Blog } from '$lib/types';

	let { data }: { data: { projects: Project[]; blogs: Blog[] } } = $props();

	const projects = [...data.projects].reverse();
	const featured = projects.slice(0, 3);
</script>

<div class="home">
	<div class="hero">
		<h1>Alex Yeh</h1>
		<p class="hero-sub">Software engineer with a focus on data pipelines, ML, and full-stack web development.</p>
		<div class="hero-ctas">
			<a href="/projects" class="btn-primary">View Projects</a>
			<a href="/resume" class="btn-secondary">Resume</a>
		</div>
	</div>

	<div class="strip side-by-side">
		<div class="side">
			<h2 class="strip-heading">About Me</h2>
			<p class="about-text">
				I'm a software engineer building data pipelines, ML experiments, and web apps in my free time.
				This site is a running catalog of projects, ideas, and things I'm learning.
			</p>
			<a href="/about" class="strip-link">More about me →</a>
		</div>
		<div class="side">
			<h2 class="strip-heading">Latest Posts</h2>
			{#if data.blogs.length}
				<ul class="blog-list">
					{#each data.blogs as blog}
						<li>
							<a href={`/blog/${blog.slug}`} class="blog-row">
								<span class="blog-title">{blog.title}</span>
								<span class="blog-date">{formatDate(blog.date)}</span>
							</a>
						</li>
					{/each}
				</ul>
				<a href="/blog" class="strip-link">View all posts →</a>
			{:else}
				<p class="empty">No posts yet.</p>
			{/if}
		</div>
	</div>

	<div class="strip">
		<h2 class="strip-heading">Latest Projects</h2>
		<ul class="card-grid">
			{#each featured as project}
				<li>
					<a href={`/projects/${project.slug}`} class="card-link">
						<article class="card">
							<div class="card-body">
								<h4>{project.title}</h4>
								<p>{project.description}</p>
							</div>
							<footer class="card-footer">
								<span class="date">{formatDate(project.date)}</span>
								<div class="tags">
									{#each project.categories.slice(0, 3) as cat}
										<span class="tag">{cat}</span>
									{/each}
								</div>
							</footer>
						</article>
					</a>
				</li>
			{/each}
		</ul>
		<a href="/projects" class="strip-link">View all projects →</a>
	</div>
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	/* ── Hero ── */
	.hero {
		max-width: 60ch;
		padding-bottom: var(--size-9);

		h1 {
			font-size: var(--font-size-fluid-3);
			font-weight: 800;
			margin-bottom: var(--size-3);
		}
	}

	.hero-sub {
		color: var(--text-2);
		line-height: var(--font-lineheight-3);
		margin-bottom: var(--size-5);
	}

	.hero-ctas {
		display: flex;
		flex-wrap: wrap;
		gap: var(--size-4);
	}

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

	/* ── Strips ── */
	.strip {
		border-top: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: var(--size-5);
		padding-block: var(--size-7);
	}

	.strip-heading {
		font-size: var(--font-size-3);
		font-weight: 700;
	}

	.strip-link {
		color: var(--link);
		font-size: var(--font-size-0);
		text-decoration: none;
		width: fit-content;
	}

	.side-by-side {
		display: grid;
		gap: var(--size-8);
		grid-template-columns: 1fr 1fr;

		@media (max-width: 640px) {
			grid-template-columns: 1fr;
		}
	}

	.side {
		display: flex;
		flex-direction: column;
		gap: var(--size-3);
	}

	.about-text {
		color: var(--text-2);
		line-height: var(--font-lineheight-3);
	}

	.empty { color: var(--text-2); font-size: var(--font-size-0); }

	/* ── Blog list ── */
	.blog-list { display: flex; flex-direction: column; }

	.blog-row {
		align-items: center;
		color: inherit;
		display: flex;
		gap: var(--size-4);
		justify-content: space-between;
		max-width: 60ch;
		padding: var(--size-2) 0;
		text-decoration: none;

		&:hover .blog-title { color: var(--link); }
	}

	.blog-title { font-weight: 500; }
	.blog-date  { color: var(--text-2); flex-shrink: 0; font-size: var(--font-size-00); }

	/* ── Card grid ── */
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

		&:hover .card {
			border-color: var(--link);
			box-shadow: var(--shadow-3);
			translate: 0 -2px;
		}
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
		align-items: center;
		border-top: 1px solid var(--border);
		display: flex;
		flex-wrap: wrap;
		gap: var(--size-2);
		justify-content: space-between;
		margin-top: var(--size-3);
		padding-top: var(--size-2);
	}

	.date { color: var(--text-2); font-size: var(--font-size-00); }

	.tags { display: flex; flex-wrap: wrap; gap: var(--size-1); }

	.tag {
		background: var(--surface-3);
		border-radius: var(--radius-2);
		color: var(--text-2);
		font-size: var(--font-size-00);
		padding: 2px var(--size-2);
	}
</style>
