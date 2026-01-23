// Files that interact with the storage of todos (towards database / localStorage)
/**
 * Save the current todos array to localStorage.
 * @param todos - The array of todos to save
 */
export function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
/**
 * Clear all saved todos by clearing localStorage.
 */
export function clearTodos() {
    localStorage.clear();
}
