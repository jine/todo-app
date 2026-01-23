import type { Todo } from './models/Todo.js';
import { renderTodos } from './components/TodoList.js';
import { getTodos, addTodo } from './services/TodoService.js';
import { saveTodos, clearTodos } from './utils/storage.js';

// Start with an empty array of todos
let todos: Todo[] = [];

// App-container
const container = document.getElementById("app") as HTMLElement;

// Listen for clicks on the app container to handle todo row interactions
if(container) {
	container.addEventListener("click", (event) => {
		// Get the actual target element that was clicked
		const target = event.target as HTMLElement;

		// Find the closest li element (todo row)
		const targetRow = target.closest("li") as HTMLElement;

		if(!targetRow) return;

		const datasetId = targetRow.dataset.id;

		// Only toggle completed status if the row has a valid id
		if (datasetId) toggleCompleted(datasetId);

	});
}

// Initialize todos on page load: load placeholders and merge saved states 
window.addEventListener("load", async () => {
	todos = await getTodos();

	const stored = localStorage.getItem("todos");

	if (stored) {
		const savedTodos = JSON.parse(stored) as Todo[];

		// Merge saved todos: update completed for existing (placeholders), add new ones
		savedTodos.forEach(saved => {
			const existing = todos.find(t => t.id === saved.id);
			if (existing) {
				existing.completed = saved.completed;
			} else {
				todos.push(saved);
			}
		});

	}

	// When we've fetched
	renderTodos(todos, container);
});

// Handle form submission to add a new todo
const form = document.getElementById("addForm") as HTMLFormElement;
form.addEventListener("submit", (event) => {
	event.preventDefault();

	const addInput = document.getElementById("addInput") as HTMLInputElement;
	const text = addInput.value.trim();

	if (text) {
		addTodo(todos, text);
		saveTodos(todos);
		renderTodos(todos, container);
		addInput.value = "";
	}
});

/**
 * Toggle the completed status of a todo by id.
 * @param id - The id of the todo to toggle
 */
function toggleCompleted(id: string): void {
    const todo = todos.find((target) => target.id === id);

    if (todo) {
        // Toggle the completed boolean
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos(todos, container);
    }
}
// Handle clear button click to reset todos
const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement;

clearBtn.addEventListener("click", () => {
	clearTodos();
	// Reload the page to reset to placeholder todos
	location.reload();
});
