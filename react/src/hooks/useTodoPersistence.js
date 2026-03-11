import { useEffect } from "react";
import { saveTodosToStorage } from "../utils/todoStorage";

//infamous useEffect, syncing react state to an external system
//in this case localStorage.
export function useTodoPersistence(todos) {
    useEffect(() => {
        saveTodosToStorage(todos);
    }, [todos]);
}
