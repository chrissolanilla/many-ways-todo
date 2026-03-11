<script>
	import { goto } from '$app/navigation';
	import { todos } from '$lib/todos.svelte.js';

	//svelte 5 rune state inside a component
	let title = $state('');
	let description = $state('');

	function addTodo() {
		const newTodo = todos.add(title, description);

		if (!newTodo) return;

		//we can directly navigate to the new todo
		goto(`/todo/${newTodo.slug}`);

		title = '';
		description = '';
	}
</script>

<div class="form">
	<input
		bind:value={title}
		type="text"
		placeholder="todo title"
		onkeydown={(e) => e.key === 'Enter' && addTodo()}
	/>

	<textarea
		bind:value={description}
		rows="4"
		placeholder="optional description"
	></textarea>

	<button onclick={addTodo}>Add todo and open page</button>
</div>

<style>
	.form {
		display: grid;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	input,
	textarea {
		padding: 0.85rem 1rem;
		border: none;
		border-radius: 0.75rem;
		background: #1e293b;
		color: white;
	}

	button {
		width: fit-content;
		padding: 0.8rem 1rem;
		border: none;
		border-radius: 0.75rem;
		background: #2563eb;
		color: white;
		font-weight: bold;
		cursor: pointer;
	}
</style>
