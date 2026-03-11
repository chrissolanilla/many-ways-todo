import { TodoProvider } from "./context/TodoContext";
import TodoView from "./views/TodoView";

//not even the App.jsx is safe from the context provider!
export default function App() {
    return (
        <TodoProvider>
            <TodoView />
        </TodoProvider>
    );
}
