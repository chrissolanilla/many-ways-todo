import Navbar from "../components/Navbar";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import TodoStats from "../components/TodoStats";
import { useTodoFilters } from "../hooks/useTodoFilters";

//we put our pages into "views", incase we want to add routing
export default function TodoView() {
    const { filteredTodos, remainingCount } = useTodoFilters();

    return (
        <main className="todo-view">
            <Navbar />
            <div className="todo-view__card">
                <TodoInput />
                <TodoStats remainingCount={remainingCount} />
                <TodoList todos={filteredTodos} />
            </div>
        </main>
    );
}
