<script lang="ts">
	import { formatDate } from '$lib/utils'
	import type { Blog } from '$lib/types';

	export let data: {
		blogs: Blog[]
	};
</script>

<!--<PageTitle>Sporadic Blogging</PageTitle>-->

<section class="blog-section">
	<h1>Blogs</h1>
    <p>On rare occasion especially if something is on my mind in particular, I may jot my thoughts down here.</p>
	<ul class="blogs">
		{#each [... data.blogs].reverse() as blog}
			<li class="blog">
				<a href={`/blog/${blog.slug}`} class="title">{blog.title}</a>
				<p class="date">{formatDate(blog.date)}</p>
				<p class="description">{blog.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.blogs {
		display: grid;
		gap: var(--size-7);

		.blog {
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
