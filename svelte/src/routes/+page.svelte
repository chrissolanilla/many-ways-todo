<script>
	import TodoForm from '$lib/components/TodoForm.svelte';
	import TodoList from '$lib/components/TodoList.svelte';

	let count = 0;
</script>

<section>
	<button on:click={() => count++}> counter button check: {count} </button>
	<h2>All Todos</h2>
	<p>
		This homepage lives in <code>src/routes/+page.svelte</code>, which maps to <code>/</code>.
	</p>

	<TodoForm />
	<TodoList />
</section>

<style>
	button {
		padding: 0.5rem 1rem;
		background-color: #ff4cd2;
		border-radius: 0.5rem;
		border: none;
		color: #fff;
	}
	h2 {
		margin-top: 0;
	}

	code {
		background: rgba(255, 255, 255, 0.08);
		padding: 0.15rem 0.35rem;
		border-radius: 0.35rem;
	}
</style>
