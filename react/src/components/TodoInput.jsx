import { useState } from "react";
import { useTodos } from "../context/TodoContext";

export default function TodoInput() {
	//our state lives in tuple arrays where we need to import useState, and its managed by context provider
    const [text, setText] = useState("");
    const { dispatch } = useTodos();

    function handleSubmit(event) {
        event.preventDefault();

        const trimmed = text.trim();
        if (!trimmed) return;

        dispatch({
            type: "ADD_TODO",
            payload: trimmed,
        });

        setText("");
    }

    return (
        <form className="todo-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                placeholder="add a todo..."
                onChange={(event) => setText(event.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}
