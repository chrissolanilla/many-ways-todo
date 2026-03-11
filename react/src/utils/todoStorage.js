//we make something in browser local storage so we can reload state
const TODO_STORAGE_KEY = "react-todos";

export function loadTodosFromStorage() {
    try {
        const raw = localStorage.getItem(TODO_STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

export function saveTodosToStorage(todos) {
    try {
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch {
		console.log("honestly im not suprised but idk how");
    }
}
