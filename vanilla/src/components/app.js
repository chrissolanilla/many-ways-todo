import "./Navbar.js";
import "./Item.js";

const html = (strings, ...values) =>
    strings.reduce((result, str, i) => result + str + (values[i] ?? ""), "");

const purple = "#bf95f9";
const background = "#15121a";

class TodoApp extends HTMLElement {
    //OOP IN JS!
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        //you could do closed to make the element null and not accessible
        //this.attachShadow({ mode: "closed" });

        this.todos = [
            { id: 1, text: "learn web components", done: true },
            { id: 2, text: "compare with react", done: false },
        ];

        this.initialized = false;
    }

    get remaining() {
        return this.todos.filter((item) => !item.done).length;
    }

	//first page load when todo-app compoennt appears
    //this runs when ever we call the dom to add or append items
	//lifetime hook VERY similar to onMounted
    connectedCallback() {
        //manually make it not do anything after first load
        if (this.initialized) return;
        this.initialized = true;

        this.shadowRoot.innerHTML = html`

            <todo-navbar></todo-navbar>

            <div class="card">
                <form id="todoForm">
                    <input
                        id="todoInput"
                        type="text"
                        placeholder="add a todo..."
                    />
                    <button type="submit">Add</button>
                </form>

                <div class="summary"></div>
                <div class="list"></div>
            </div>

			<!-- styles are nested like svelte and vue(scope styles) -->
            <style>
                :host {
                    display: block;
                    max-width: 700px;
                    margin: 2rem auto;
                    font-family: Arial, sans-serif;
                }

                .card {
                    background: ${background};
                    padding: 1rem;
                    border-radius: 16px;
                }

                form {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                input {
                    flex: 1;
                    padding: 0.75rem;
                    border-radius: 10px;
                    border: 1px solid #ccc;
                }

                button {
                    padding: 0.75rem 1rem;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    background: ${purple};
                    color: #000;
                    font-weight: bold;
                }

                .summary {
                    margin-bottom: 1rem;
                    font-weight: bold;
                }

                .empty {
                    padding: 1rem;
                    text-align: center;
                    color: #666;
                }
            </style>
        `;

        this.inputEl = this.shadowRoot.getElementById("todoInput");
        this.summaryEl = this.shadowRoot.querySelector(".summary");
        this.listEl = this.shadowRoot.querySelector(".list");

        this.shadowRoot.addEventListener("submit", (event) => {
            event.preventDefault();

            const text = this.inputEl.value.trim();
            if (!text) return;

            this.todos.push({
                id: Date.now(),
                text,
                done: false,
            });

            this.inputEl.value = "";
            this.render();
        });

        this.shadowRoot.addEventListener("toggle-todo", (event) => {
            const itemEl = event.target.closest("todo-item");
            const id = Number(itemEl.dataset.id);

            this.todos = this.todos.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo,
            );

            this.render();
        });

        this.shadowRoot.addEventListener("delete-todo", (event) => {
            const itemEl = event.target.closest("todo-item");
            const id = Number(itemEl.dataset.id);

            this.todos = this.todos.filter((todo) => todo.id !== id);
            this.render();
        });

        this.render();
    }


	//whenever this component is removed from dom, we can execute whatgever code we want
	disconnectedCallback() {
		console.log("todo-app removed");
	}

	//whenever we change something, we can define our own render(default) function to render only what we want
    render() {
        this.summaryEl.textContent = `Remaining: ${this.remaining}`;

        this.listEl.innerHTML =
            this.todos.length === 0
                ? html`<div class="empty">No todos yet</div>`
                : this.todos
                      .map(
                          (todo) => html`
                            <todo-item
                                data-id="${todo.id}"
                                text="${todo.text}"
                                done="${todo.done}"
                            ></todo-item>
                        `,
                      )
                      .join("");
    }
}

customElements.define("todo-app", TodoApp);

