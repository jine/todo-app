import type { Todo } from '../models/Todo.js';

/**
 * Fetch placeholder todos from the JSON file.
 * @returns Promise resolving to array of Todo items
 */
export async function getTodos(): Promise<Todo[]> {
	const response = await fetch('./todos.json');
	const data = await response.json();
	return data;
}

/**
 * Add a new todo item to the list.
 * @param todos - The array to add the todo to
 * @param addText - The text for the new todo
 */
export function addTodo(todos: Todo[], addText: string): void {

	// Set minimum length, this is validated via HTML too, but still
	if(addText.length < 5) alert('Minst 10 tecken!');

	//todos.push({ id: Date.now(), text: addText}); // Use unixtimestamp in ms as id
	todos.push({ id: crypto.randomUUID(), text: addText});
}