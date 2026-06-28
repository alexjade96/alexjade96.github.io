<script lang="ts">
	import { formatDate } from '$lib/utils'
	import type { Project } from '$lib/types';

	let { data }: { data: { projects: Project[] } } = $props();

	let selectedCategory = $state('All');

	const projects = [...data.projects].reverse();

	const categories = $derived([
		'All',
		...Array.from(new Set(projects.flatMap((p) => p.categories))).sort()
	]);

	const filtered = $derived(
		selectedCategory === 'All'
			? projects
			: projects.filter((p) => p.categories.includes(selectedCategory))
	);
</script>

<section class="project-section">
	<h1>Projects</h1>
	<p>Here are some projects I've worked on in my free time.</p>

	<div class="filters">
		{#each categories as category}
			<button
				class="chip"
				class:active={selectedCategory === category}
				onclick={() => (selectedCategory = category)}
			>
				{category}
			</button>
		{/each}
	</div>

	<ul class="projects">
		{#each filtered as project}
			<li class="project">
				<a href={`/projects/${project.slug}`} class="card-link">
					<article class="card">
						<div class="card-body">
							<h2 class="title">{project.title}</h2>
							<p class="description">{project.description}</p>
						</div>
						<footer class="card-footer">
							<span class="date">{formatDate(project.date)}</span>
							<div class="tags">
								{#each project.categories as cat}
									<span class="tag">{cat}</span>
								{/each}
							</div>
						</footer>
					</article>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.project-section {
		> p {
			color: var(--text-2);
			margin-block: var(--size-3);
		}
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: var(--size-2);
		margin-block: var(--size-6);
	}

	.chip {
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-round);
		color: var(--text-2);
		cursor: pointer;
		font-size: var(--font-size-0);
		padding: var(--size-1) var(--size-3);
		transition: background 0.15s, color 0.15s;

		&:hover {
			background: var(--surface-3);
			color: var(--text-1);
		}

		&.active {
			background: var(--link);
			border-color: var(--link);
			color: white;
		}
	}

	.projects {
		display: grid;
		gap: var(--size-5);
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	}

	.project {
		display: contents;
	}

	.card-link {
		text-decoration: none;
		color: inherit;
		display: flex;

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
		padding: var(--size-5);
		transition: border-color 0.15s, box-shadow 0.15s, translate 0.15s;
		width: 100%;
	}

	.card-body {
		flex: 1;

		.title {
			font-size: var(--font-size-2);
			font-weight: 600;
			margin-bottom: var(--size-2);
		}

		.description {
			color: var(--text-2);
			font-size: var(--font-size-0);
			line-height: var(--font-lineheight-3);
			margin-top: var(--size-2);
		}
	}

	.card-footer {
		border-top: 1px solid var(--border);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--size-2);
		justify-content: space-between;
		margin-top: var(--size-4);
		padding-top: var(--size-3);
	}

	.date {
		color: var(--text-2);
		font-size: var(--font-size-00);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--size-1);
	}

	.tag {
		background: var(--surface-3);
		border-radius: var(--radius-2);
		color: var(--text-2);
		font-size: var(--font-size-00);
		padding: 2px var(--size-2);
	}
</style>
