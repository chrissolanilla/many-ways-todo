import { createContext, useContext, useMemo, useReducer } from "react";
import { todoReducer, initialTodoState } from "../utils/todoReducer";
import { loadTodosFromStorage } from "../utils/todoStorage";
import { useTodoPersistence } from "../hooks/useTodoPersistence";

const TodoContext = createContext(null);

export function useTodos() {
    return useContext(TodoContext);
}

//we can save state to localStorage cause we are crazy but its actually neat.
function initTodoState(defaultState) {
    const savedTodos = loadTodosFromStorage();
    if (!savedTodos){
		return defaultState;
	}

    return {
        ...defaultState,
        todos: savedTodos,
    };
}

//we use useReducer and useMemo
//useReducer is used to manage state similar to useEffect but more complicated
//useMemo is used to optimize performance by caching computed values between renders
//unless a dependency changes
export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodoState, initTodoState);
    useTodoPersistence(state.todos);

    const value = useMemo(() => {
        return {
            todos: state.todos,
            filter: state.filter,
            dispatch,
        };
    }, [state]);

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
