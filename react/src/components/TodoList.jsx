import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";

//this gets rendered once every time the state changes
export default function TodoList({ todos }) {
    if (todos.length === 0) {
        return <EmptyState />;
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}
