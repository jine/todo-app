import type { Todo } from '../models/Todo.js';

/**
 * Renders the todo list in the DOM. JSDoc is really helpful :D
 * @param todos - Array of Todo items to render
 * @param container - The HTML element to append the list to
 */
export function renderTodos(todos: Todo[], container: HTMLElement): void {
	const todoList = document.createElement("ul");
	todoList.classList.add("space-y-2"); // space on y axis

	todos.forEach(({id, text, completed}) => {
		const aTodo = document.createElement("li");
		aTodo.className = "flex items-center justify-between p-2 bg-gray-700 border border-gray-600 cursor-pointer rounded";

		// Store the todo id in the element's dataset
		aTodo.dataset.id = id; // .toString() Not needed, all IDs are strings

		const textSpan = document.createElement("span");
		textSpan.textContent = text;

		// Apply strikethrough and gray color if completed
		if (completed) {
			textSpan.style.textDecoration = "line-through";
			textSpan.classList.add("text-gray-400");
		}

		aTodo.appendChild(textSpan);

		// Add an button per row
		//const button = document.createElement("button");
		//button.innerHTML = '<i class="fa-times fas"></i>';
		//button.className = "text-red-400 hover:text-red-600";
		//button.addEventListener("click", () => toggleCompleted(todo.id));
		//li.appendChild(button);

		todoList.appendChild(aTodo);
	});

	//container.innerHTML = "";
	//container.appendChild(todoList);

	// Replace contents
	container.replaceChildren(todoList);
}