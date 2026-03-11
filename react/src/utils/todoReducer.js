export const initialTodoState = {
    todos: [
        { id: 1, text: "learn react", done: false },
        { id: 2, text: "overengineer todo app", done: true },
    ],
    filter: "all",
};

export function todoReducer(state, action) {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: Date.now(),
                        text: action.payload,
                        done: false,
                    },
                ],
            };

        case "TOGGLE_TODO":
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
                ),
            };

        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
            };

        case "SET_FILTER":
            return {
                ...state,
                filter: action.payload,
            };

        default:
            return state;
    }
}
