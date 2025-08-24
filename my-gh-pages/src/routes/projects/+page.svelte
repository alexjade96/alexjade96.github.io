<script lang="ts">
	import { formatDate } from '$lib/utils'
	import type { Project } from '$lib/types';

	export let data: {
		projects: Project[]
	};
</script>

<section class="project-section">
	<h1>Projects</h1>
    <p>Here are some projects I've worked on in my free time.</p>
	<ul class="projects">
		{#each [... data.projects].reverse() as project}
			<li class="project">
				<a href={`/projects/${project.slug}`} class="title">{project.title}</a>
				<p class="date">{formatDate(project.date)}</p>
				<p class="description">{project.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.projects {
		display: grid;
		gap: var(--size-7);

		.project {
			max-inline-size: var(--size-content-3);

			&:not(:last-child) {
				border-bottom: 1px solid var(--border);
				padding-bottom: var(--size-7);
			}

			.title {
				font-size: var(--font-size-fluid-3);
				text-transform: capitalize;
			}

			.date {
				color: var(--text-2);
			}

			.description {
				margin-top: var(--size-3);
			}
		}
	}
</style>
