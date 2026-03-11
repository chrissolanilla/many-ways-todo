import { createSignal, createMemo, For } from "solid-js";

function App() {
	//solid uses signals instead of react style state
	const [todos, setTodos] = createSignal([
		{ id: 1, text: "learn solid signals", done: false },
		{ id: 2, text: "build todo app", done: true }
	]);

	const [newTodo, setNewTodo] = createSignal("");
	const [showDone, setShowDone] = createSignal(true);

	//similar to useMemo, recomputes only when its dependencies change
	const visibleTodos = createMemo(() => {
		if (showDone() ){
			return todos();
		}

		return todos().filter((todo) => !todo.done);
	});

	function addTodo() {
		const text = newTodo().trim();
		if (!text) return;

		setTodos([
			{
				id: Date.now(),
				text, done: false
			},
			...todos()
		]);

		setNewTodo("");
	}

	function toggleTodo(id) {
		setTodos(
			todos().map((todo) =>
				todo.id === id ? {
					...todo,
					done: !todo.done
				} : todo
			)
		);
	}

	function removeTodo(id) {
		setTodos(todos().filter((todo) => todo.id !== id));
	}

	const totalCount = createMemo(() => todos().length);
	const doneCount = createMemo(() => todos().filter((todo) => todo.done).length);

	return (
		<div class="app">
			<header class="card">
				<h1>Solid Todo App</h1>
				<p>
					Its not actually as solid as the react example, but the framework is.
				</p>
			</header>

			<section class="card">
				<h2>Add Todo</h2>

				<div class="row">
					<input
						type="text"
						placeholder="enter todo"
						value={newTodo()}
						onInput={(e) => setNewTodo(e.currentTarget.value)}
						onKeyDown={(e) => e.key === "Enter" && addTodo()}
					/>
					<button onClick={addTodo}>Add</button>
				</div>
			</section>

			<section class="card">
				<div class="row space-between">
					<h2>Todos</h2>

					<button onClick={() => setShowDone(!showDone())}>
						{showDone() ? "Hide done" : "Show done"}
					</button>
				</div>

				<p class="stats">
					total: {totalCount()} | done: {doneCount()}
				</p>

				{visibleTodos().length === 0 ? (
					<p>No todos to show.</p>
				) : (
					<div class="list">
					{/* very nice for each loops in solid compared to react */}
						<For each={visibleTodos()}>
							{(todo) => (
								<div class="todo-row">
									<div class="left">
										<span classList={{ done: todo.done }}>
											{todo.text}
										</span>
									</div>

								<div style="display:flex; gap: 0.5rem;">
									<button
									onClick={() => toggleTodo(todo.id)}
									>
									{todo.done ? "undo" : "done"}
									</button>
									<button class="danger" onClick={() => removeTodo(todo.id)}>
									Delete
									</button>
								</div>
								</div>
							)}
						</For>
					</div>
				)}
			</section>
		</div>
	);
}

export default App;
