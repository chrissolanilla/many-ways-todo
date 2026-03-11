<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { todos } from '$lib/todos.svelte.js';

	//in sveltekit layouts/pages, children comes in through $props()
	//the layout must render children so nested pages can appear inside it
	//basically layout shows up in every url(like a nav bar)
	let { children } = $props();

	onMount(() => {
		//load todos once when the app starts in the browser
		todos.load();
	});
</script>

<svelte:head>
	<title>SvelteKit Todo Showcase</title>
	<meta
		name="description"
		content="A SvelteKit todo app showing layouts, dynamic routes, and Svelte 5 runes."
	/>
</svelte:head>

<div class="app-shell">
	<header class="topbar">
		<div>
			<h1>SvelteKit Todo Showcase</h1>
			<p class="subtitle">layouts, runes, and dynamic routes</p>
		</div>

		<nav>
			<a href="/" class:active={page.url.pathname === '/'}>Home</a>
		</nav>
	</header>

	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Arial, Helvetica, sans-serif;
		background: #0f172a;
		color: #e2e8f0;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	.app-shell {
		min-height: 100vh;
		max-width: 900px;
		margin: 0 auto;
		padding: 1.5rem;
	}

	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.subtitle {
		margin: 0.25rem 0 0;
		opacity: 0.7;
	}

	nav {
		display: flex;
		gap: 1rem;
	}

	nav a {
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		background: rgba(255, 255, 255, 0.06);
	}

	nav a.active {
		background: #2563eb;
	}

	.content {
		display: block;
	}
</style>
