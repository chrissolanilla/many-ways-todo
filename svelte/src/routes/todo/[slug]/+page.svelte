<script>
	import { page } from '$app/state';
	import { todos } from '$lib/todos.svelte.js';

	//[slug] in the folder name becomes page.params.slug
	let slug = $derived(page.params.slug);
	let todo = $derived(todos.getBySlug(slug));
</script>

{#if todo}
	<article class="todo-page">
		<a class="back" href="/">← Back to all todos</a>

		<h2>{todo.title}</h2>

		<p class="meta">
			Slug from URL: <code>{slug}</code>
		</p>

		<p class:done={todo.done}>
			Status: {todo.done ? 'Done' : 'Not done'}
		</p>

		{#if todo.description}
			<div class="description">
				<h3>Description</h3>
				<p>{todo.description}</p>
			</div>
		{:else}
			<p class="muted">This todo has no description yet.</p>
		{/if}

		<div class="actions">
			<button onclick={() => todos.toggle(todo.id)}>
				Mark as {todo.done ? 'not done' : 'done'}
			</button>

			<button class="danger" onclick={() => todos.remove(todo.id)}>
				Delete
			</button>
		</div>
	</article>
{:else}
	<section>
		<a class="back" href="/">← Back to all todos</a>
		<h2>Todo not found</h2>
		<p>That slug does not match anything currently in localStorage.</p>
	</section>
{/if}

<style>
	.todo-page {
		display: grid;
		gap: 1rem;
		background: #1e293b;
		padding: 1.25rem;
		border-radius: 1rem;
	}

	.back {
		opacity: 0.8;
	}

	.meta,
	.muted {
		opacity: 0.75;
	}

	.description {
		background: rgba(255, 255, 255, 0.05);
		padding: 1rem;
		border-radius: 0.75rem;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
	}

	button {
		padding: 0.75rem 1rem;
		border: none;
		border-radius: 0.7rem;
		background: #2563eb;
		color: white;
		cursor: pointer;
		font-weight: bold;
	}

	.danger {
		background: #dc2626;
	}

	.done {
		color: #4ade80;
	}

	code {
		background: rgba(255, 255, 255, 0.08);
		padding: 0.15rem 0.35rem;
		border-radius: 0.35rem;
	}
</style>
