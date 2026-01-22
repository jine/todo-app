interface Todo {
	id: string;
	text: string;
	completed?: boolean;
}

// Start with an empty array of todos
let todos: Todo[] = [];

// App-container
const container = document.getElementById("app") as HTMLElement;

// Fetch placeholder todos from the JSON file
async function fetchTodos(): Promise<Todo[]> {
	const response = await fetch('./todos.json');
	const data = await response.json();
	return data;
}

// Add a new todo item to the list
function addTodo(addText: string): void {
	//todos.push({ id: Date.now(), text: addText}); // ID becomes a unixtimestamp in ms
	todos.push({ id: crypto.randomUUID(), text: addText});
}

// Save the current todos array to localStorage
function saveTodos(): void {
	localStorage.setItem("todos", JSON.stringify(todos));
}

// Clear all saved todos by setting localStorage to an empty array
function clearTodos(): void {
    //localStorage.setItem("todos", JSON.stringify([]));
	localStorage.clear();
}

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

// Render the todo list in the DOM
function renderTodos(): void {
	const list = document.createElement("ul");
	list.classList.add("space-y-2");

	todos.forEach(({id, text, completed}) => {
		const li = document.createElement("li");
		li.className = "p-2 bg-gray-700 rounded border border-gray-600 flex justify-between items-center cursor-pointer";

		// Store the todo id in the element's dataset
		li.dataset.id = id.toString();

		const textSpan = document.createElement("span");
		textSpan.textContent = text;

		// Apply strikethrough and gray color if completed
		if (completed) {
			textSpan.style.textDecoration = "line-through";
			textSpan.classList.add("text-gray-400");
		}

		li.appendChild(textSpan);

		// Add an button per row
		//const button = document.createElement("button");
		//button.innerHTML = '<i class="fas fa-times"></i>';
		//button.className = "text-red-400 hover:text-red-600";
		//button.addEventListener("click", () => toggleCompleted(todo.id));
		//li.appendChild(button);

		list.appendChild(li);
	});

	if (container) {
		container.innerHTML = "";
		container.appendChild(list);
	}
}

// Toggle the completed status of a todo by id
function toggleCompleted(id: string): void {
	const todo = todos.find((target) => target.id === id);

	if (todo) {
		// Toggle the completed boolean
		todo.completed = !todo.completed;
		saveTodos();
		renderTodos();
	}
}

// Initialize todos on page load: load placeholders and merge saved states
window.addEventListener("load", async () => {
	todos = await fetchTodos();

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
	renderTodos();
});

// Handle form submission to add a new todo
const form = document.getElementById("addForm") as HTMLFormElement;

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const addInput = document.getElementById("addInput") as HTMLInputElement;
	const text = addInput.value.trim();

	if (text) {
		addTodo(text);
		saveTodos();
		renderTodos();
		addInput.value = "";
	}
});

// Handle clear button click to reset todos
const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement;

clearBtn.addEventListener("click", () => {
	clearTodos();
	// Reload the page to reset to placeholder todos
	location.reload();
});
