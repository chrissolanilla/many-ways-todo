const pink = '#ff7ac6';
const purple = '#bf95f9';
const background = '#15121a';

const html = (strings, ...values) =>
    strings.reduce((result, str, i) => result + str + (values[i] ?? ""), "");

class TodoNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = html`
            <nav>
                <div>
                    <h2>Vanilla Todo</h2>
                    <div class="subtitle">built with web components</div>
                </div>
            </nav>

            <style>
                nav {
                    display: flex;
					flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 1rem;
                    background: ${background};
                    color: white;
                    border-radius: 12px;
                    margin-bottom: 1rem;
                }

                h2 {
                    margin: 0;
                    font-size: 1.2rem;
					color: ${pink};
					text-align: center;

                }

                .subtitle {
                    font-size: 0.9rem;
                    opacity: 0.8;
                }
            </style>
        `;
    }
}

customElements.define("todo-navbar", TodoNavbar);

