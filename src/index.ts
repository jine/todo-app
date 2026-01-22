interface Todo {
	id: number | string;
	text: string;
	completed?: boolean;
}

const placeholderTodos = [
  { id: '1', text: 'Learn TypeScript', completed: true },
  { id: '2', text: 'Build a todo app', completed: false },
  { id: '3', text: 'Deploy to Coolify', completed: false },
];

// Start with an empty array of todos
let todos: Todo[] = [];

// App-container
const container = document.getElementById("app") as HTMLElement;

async function fetchTodos(): Promise<Todo[]> {
	//const { placeholderTodos } = placeholderTodos;
	todos = placeholderTodos;
	return todos;
}

function addTodo(addText: string): void {
	//todos.push({ todoId: Date.now(), todoText: text});
	todos.push({ id: crypto.randomUUID(), text: addText});
}

function saveTodos(): void {
	localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos(): void {
    localStorage.setItem("todos", JSON.stringify([]));
}

// Listen for click in the entire app-element globally
if(container) {
	container.addEventListener("click", (event) => {
		// Get the actual target we've clicked on
		const target = event.target as HTMLElement;

		// Get the closest row (li element)
		const targetRow = target.closest("li") as HTMLElement;


		if(!targetRow) return;

		const rowId = targetRow.dataset.id;

		toggleCompleted(rowId);

	});
}

function renderTodos(): void {
	const list = document.createElement("ul");
	list.classList.add("space-y-2");

	todos.forEach(({id, text, completed}) => {

		const li = document.createElement("li");
		li.className = "p-2 bg-gray-700 rounded border border-gray-600 flex justify-between items-center";

		// Set data-id on element to keep it
		li.dataset.id = id.toString();

		const textSpan = document.createElement("span");
		textSpan.textContent = text;

		if (completed) {
			textSpan.style.textDecoration = "line-through";
			textSpan.classList.add("text-gray-400");
		}

		li.appendChild(textSpan);

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

function toggleCompleted(id: string): void {
	const todo = todos.find((target) => target.id === id);

	if (todo) {
		todo.completed = !todo.completed;
		saveTodos();
		renderTodos();
	}
}

// Load todos on page load
window.addEventListener("load", async () => {
	const stored = localStorage.getItem("todos");

	if (stored) {
		todos = JSON.parse(stored);
	} else {
		await fetchTodos();
	}

	renderTodos();
});

// Handle form submit
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
