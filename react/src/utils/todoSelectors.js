//this could ahve been part of the component but its purposefully obfsucated

export function selectFilteredTodos(todos, filter) {
    if (filter === "active") return todos.filter((todo) => !todo.done);
    if (filter === "done") return todos.filter((todo) => todo.done);
    return todos;
}

export function selectRemainingCount(todos) {
    return todos.filter((todo) => !todo.done).length;
}
