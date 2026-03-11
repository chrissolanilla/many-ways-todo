import { useTodos } from "../context/TodoContext";

//same idea, we call on this global context provider to change state for the whole app
export default function TodoStats({ remainingCount }) {
    const { filter, dispatch } = useTodos();

    return (
        <section className="todo-stats">
            <p>Remaining: {remainingCount}</p>

            <div className="todo-stats__filters">
                <button
                    type="button"
                    className={filter === "all" ? "is-active" : ""}
                    onClick={() => dispatch({
						type: "SET_FILTER",
						payload: "all"
					})}
                >
                    All
                </button>
                <button
                    type="button"
                    className={filter === "active" ? "is-active" : ""}
                    onClick={() => dispatch({
						type: "SET_FILTER",
						payload: "active"
					})}
                >
                    Active
                </button>
                <button
                    type="button"
                    className={filter === "done" ? "is-active" : ""}
                    onClick={() => dispatch({
						type: "SET_FILTER",
						payload: "done"
					})}
                >
                    Done
                </button>
            </div>
        </section>
    );
}
