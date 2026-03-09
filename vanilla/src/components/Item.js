const pink = '#ff7ac6';
const purple = '#bf95f9';
const background = '#15121a';

const html = (strings, ...values) =>
    strings.reduce((result, str, i) => result + str + (values[i] ?? ""), "");

class TodoItem extends HTMLElement {
	//props
    static observedAttributes = ["text", "done"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const text = this.getAttribute("text") || "";
        const done = this.getAttribute("done") === "true";

        this.shadowRoot.innerHTML = html`

            <div class="item">
                <span class="text">${text}</span>

                <div class="actions">
                    <button id="toggleBtn">${done ? "Undo" : "Done"}</button>
                    <button id="deleteBtn">Delete</button>
                </div>
            </div>


            <style>
                .item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.75rem 1rem;
                    margin-bottom: 0.5rem;
                    border: 1px solid ${pink};
                    border-radius: 10px;
                    background: #1e1e2e;
					color: ${pink};
                }

                .text {
                    flex: 1;
                    text-decoration: ${done ? "line-through" : "none"};
                    opacity: ${done ? "0.6" : "1"};
                }

                .actions {
                    display: flex;
                    gap: 0.5rem;
                }

                button {
                    cursor: pointer;
                    border: none;
                    padding: 0.5rem 0.75rem;
                    border-radius: 8px;
					background: ${purple};
					color: #000;
					font-weight: bold;
                }
            </style>
        `;

        this.shadowRoot.getElementById("toggleBtn").onclick = () => {
            this.dispatchEvent(
                new CustomEvent("toggle-todo", {
                    bubbles: true,
                    composed: true,
                }),
            );
        };

        this.shadowRoot.getElementById("deleteBtn").onclick = () => {
            this.dispatchEvent(
                new CustomEvent("delete-todo", {
                    bubbles: true,
                    composed: true,
                }),
            );
        };
    }
}

customElements.define("todo-item", TodoItem);

