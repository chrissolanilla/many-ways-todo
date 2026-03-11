import { useMemo } from "react";
import { useTodos } from "../context/TodoContext";
import { selectFilteredTodos, selectRemainingCount } from "../utils/todoSelectors";

//useMemo for memoization for optimizing
//overengineer'd with aclling our util
export function useTodoFilters() {
    const { todos, filter } = useTodos();

    const filteredTodos = useMemo(() => selectFilteredTodos(todos, filter), [todos, filter]);

    const remainingCount = useMemo(() => selectRemainingCount(todos), [todos]);

    return { filteredTodos, remainingCount };
}
