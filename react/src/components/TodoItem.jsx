import { useTodos } from "../context/TodoContext";

//same idea with the context provider
export default function TodoItem({ todo }) {
    const { dispatch } = useTodos();

    return (
        <li className="todo-item">
            <span className={todo.done ? "todo-item__text is-done" : "todo-item__text"}>
                {todo.text}
            </span>

            <div className="todo-item__actions">
                <button
                    type="button"
                    onClick={() => dispatch({
						type: "TOGGLE_TODO",
						payload: todo.id
					})}
                >
                    {todo.done ? "Undo" : "Done"}
                </button>

                <button
                    type="button"
                    onClick={() => dispatch({
						type: "DELETE_TODO",
						payload: todo.id
					})}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
