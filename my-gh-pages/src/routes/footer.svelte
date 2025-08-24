<script lang="ts">
	import * as config from '$lib/config'

	import { onMount } from 'svelte';
	let lastUpdated = $state('');

	onMount(async () => {
		const res = await fetch('/site-meta.json');
		const data = await res.json();
		lastUpdated = new Date(data.lastUpdated).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			// hour: '2-digit',
			// minute: '2-digit',
		});
	});
	console.log('Config repo:', config.repo);
</script>

<section class="comments">
<h3>Comments section</h3>
<p>Testing using Utterances (Github Issues) to provide comments</p>
<div>
  <script src="https://utteranc.es/client.js"
        repo={config.repo}
        issue-term="url"
        theme="github-light"
        crossorigin="anonymous"
        async>
  </script>
</div>
</section>

<footer class="footer">
	<div class="footer-content">
		<div class="footer-left">
			<p>{config.title} &copy {new Date().getFullYear()}</p>
		</div>
		<div class="footer-right">
			<p>Site last updated: {lastUpdated || 'Unknown'}</p>
		</div>
	</div>
</footer>

<style>
	footer {
		padding-block: var(--size-7);
		border-top: 1px solid var(--border);
		p {
			color: var(--text-2);
		}
	}
	.footer-content {
		max-width: 1280px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.footer-left,
	.footer-right {
		font-size: 0.75rem;
	}
	.footer-right {
		text-align: right;
	}
</style>
