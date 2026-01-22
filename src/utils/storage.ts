import { Todo } from '../models/Todo.js';

/**
 * Save the current todos array to localStorage.
 * @param todos - The array of todos to save
 */
export function saveTodos(todos: Todo[]): void {
	localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * Clear all saved todos by clearing localStorage.
 */
export function clearTodos(): void {
	localStorage.clear();
}