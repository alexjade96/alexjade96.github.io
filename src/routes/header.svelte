<script lang="ts">
	import * as config from '$lib/config'
	import Toggle from '$lib/components/toggle.svelte'
	import { dev } from '$app/environment'

	let devMenuOpen = $state(false)
</script>

<nav>
	<a href="/" class="title">
		<b>{config.title}</b>
	</a>
	<ul class="links">
		<li>
			<a href="/about">About</a>
		</li>
		<li>
			<a href="/projects">Projects</a>
		</li>
		<li>
			<a href="/resume">Resume</a>
		</li>
		<li>
			<a href="/blog">Blog</a>
		</li>
		<li>
			<a href="/contact">Contact</a>
		</li>
		{#if dev}
			<li class="dev-menu">
				<button onclick={() => (devMenuOpen = !devMenuOpen)}>
					Dev ▾
				</button>
				{#if devMenuOpen}
					<ul class="dev-dropdown">
						<li><a href="/layout-test">Layout Test</a></li>
						<li><a href="/ideas">Idea Tracker</a></li>
						<li><a href="/games">Game Stuff</a></li>
						<li><a href="/temp">Experimental Testing</a></li>
					</ul>
				{/if}
			</li>
		{/if}
	</ul>
	<Toggle />
</nav>

<style>
	nav {
		padding-block: var(--size-7);

		@media (min-width: 768px) {
			display: flex;
			justify-content: space-between;
		}

		.links {
			margin-block: var(--size-7);

			@media (min-width: 768px) {
				display: flex;
				gap: var(--size-7);
				margin-block: 0;
				align-items: center;
			}
		}

		a {
			color: inherit;
			text-decoration: none;
		}
	}

	.dev-menu {
		position: relative;

		button {
			background: none;
			border: 1px dashed var(--text-2);
			color: var(--text-2);
			cursor: pointer;
			font: inherit;
			font-size: 0.9em;
			padding: var(--size-1) var(--size-2);
			border-radius: var(--radius-2);
		}
	}

	.dev-dropdown {
		background: var(--surface-2);
		border: 1px solid var(--border);
		border-radius: var(--radius-2);
		box-shadow: var(--shadow-3);
		display: flex;
		flex-direction: column;
		gap: var(--size-2);
		left: 0;
		min-width: 160px;
		padding: var(--size-3);
		position: absolute;
		top: calc(100% + var(--size-2));
		z-index: 10;

		a {
			color: var(--text-2);
			font-size: 0.9em;

			&:hover {
				color: var(--text-1);
			}
		}
	}
</style>