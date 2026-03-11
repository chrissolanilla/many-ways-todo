const html = (strings, ...values) =>
	strings.reduce((result, str, i) => result + str + (values[i] ?? ''), '');

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//in memory database
let todos = [
	{ id: 1, title: 'learn htmx', done: false },
	{ id: 2, title: 'learn alpine', done: true }
];

function renderTodos() {
	if (todos.length === 0) {
		return `<p>No todos yet.</p>`;
	}

	//back to good old js magic
	return todos
		.map(
			(todo) => html`
				<div class="todo-row">
					<div class="${todo.done ? 'done' : ''}">
						${todo.title}
					</div>

					<div style="display:flex; gap:0.5rem;">
						<button
							type="button"
							hx-post="/todos/${todo.id}/toggle"
							hx-target="#todo-list"
							hx-swap="innerHTML"
						>
							${todo.done ? 'Undo' : 'Done'}
						</button>

						<button
							type="button"
							hx-post="/todos/${todo.id}/delete"
							hx-target="#todo-list"
							hx-swap="innerHTML"
						>
							Delete
						</button>
					</div>
				</div>
			`
		)
		.join('');
}

app.get('/todos', (_req, res) => {
	res.send(renderTodos());
});

app.post('/todos', (req, res) => {
	const title = (req.body.title || '').trim();

	if (title) {
		todos.unshift({
			id: Date.now(),
			title,
			done: false
		});
	}

	res.send(renderTodos());
});

app.post('/todos/:id/toggle', (req, res) => {
	const id = Number(req.params.id);
	todos = todos.map((todo) =>
		todo.id === id ? { ...todo, done: !todo.done } : todo
	);

	res.send(renderTodos());
});

app.post('/todos/:id/delete', (req, res) => {
	const id = Number(req.params.id);
	todos = todos.filter((todo) => todo.id !== id);

	res.send(renderTodos());
});

app.listen(PORT, () => {
	console.log(`server running at http://localhost:${PORT}`);
});
