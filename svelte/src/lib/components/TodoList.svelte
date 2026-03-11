<script>
	import { todos } from '$lib/todos.svelte.js';
</script>

{#if todos.items.length === 0}
	<p class="empty">No todos yet. Add one above.</p>
{:else}
	<div class="list">
		{#each todos.items as todo (todo.id)}
			<div class="card">
				<div class="left">
					<input
						type="checkbox"
						checked={todo.done}
						onchange={() => todos.toggle(todo.id)}
					/>

					<div>
						<a class="title" href={`/todo/${todo.slug}`}>
							{todo.title}
						</a>

						{#if todo.description}
							<p class="desc">{todo.description}</p>
						{/if}
					</div>
				</div>

				<button class="delete" onclick={() => todos.remove(todo.id)}>
					Delete
				</button>
			</div>
		{/each}
	</div>
{/if}

<style>
	.empty {
		opacity: 0.75;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.04);
		border-radius: 0.75rem;
	}

	.list {
		display: grid;
		gap: 0.85rem;
	}

	.card {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: flex-start;
		background: #1e293b;
		padding: 1rem;
		border-radius: 0.9rem;
	}

	.left {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}

	.title {
		font-weight: bold;
		font-size: 1.05rem;
	}

	.desc {
		margin: 0.35rem 0 0;
		opacity: 0.8;
	}

	.delete {
		border: none;
		border-radius: 0.6rem;
		padding: 0.6rem 0.8rem;
		background: #dc2626;
		color: white;
		cursor: pointer;
	}
</style>
