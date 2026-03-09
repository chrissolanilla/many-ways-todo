import './style.css';
import './components/app.js';

const html = (strings, ...values) =>
    strings.reduce((result, str, i) => result + str + (values[i] ?? ""), "");

const app = document.getElementById('app');

function renderInitialUI() {
    app.innerHTML = html`
        <todo-app></todo-app>
        <button id="explode">Explode app</button>

        <style>
            #explode, #recreate {
                color: black;
                font-weight: bold;
            }
        </style>
    `;

    setupExplodeButton();
}

function setupExplodeButton() {
    const explodeButton = document.getElementById('explode');

    explodeButton.addEventListener('click', () => {
        const todoApp = document.querySelector('todo-app');
        if (todoApp) todoApp.remove();

        explodeButton.remove();

        const recreateAppButton = document.createElement('button');
        recreateAppButton.id = 'recreate';
        recreateAppButton.innerText = 'Recreate App';
        app.append(recreateAppButton);

        recreateAppButton.addEventListener('click', () => {
            renderInitialUI();
        });
    });
}

renderInitialUI();
