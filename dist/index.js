"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Start with an empty array of todos
let todos = [];
// App-container
const container = document.getElementById("app");
// Fetch placeholder todos from the JSON file
function fetchTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('./todos.json');
        const data = yield response.json();
        return data;
    });
}
// Add a new todo item to the list
function addTodo(addText) {
    //todos.push({ id: Date.now(), text: addText}); // ID becomes a unixtimestamp in ms
    todos.push({ id: crypto.randomUUID(), text: addText });
}
// Save the current todos array to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Clear all saved todos by setting localStorage to an empty array
function clearTodos() {
    //localStorage.setItem("todos", JSON.stringify([]));
    localStorage.clear();
}
// Listen for clicks on the app container to handle todo row interactions
if (container) {
    container.addEventListener("click", (event) => {
        // Get the actual target element that was clicked
        const target = event.target;
        // Find the closest li element (todo row)
        const targetRow = target.closest("li");
        if (!targetRow)
            return;
        const datasetId = targetRow.dataset.id;
        // Only toggle completed status if the row has a valid id
        if (datasetId)
            toggleCompleted(datasetId);
    });
}
// Render the todo list in the DOM
function renderTodos() {
    const list = document.createElement("ul");
    list.classList.add("space-y-2");
    todos.forEach(({ id, text, completed }) => {
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
function toggleCompleted(id) {
    const todo = todos.find((target) => target.id === id);
    if (todo) {
        // Toggle the completed boolean
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}
// Initialize todos on page load: load placeholders and merge saved states
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    todos = yield fetchTodos();
    const stored = localStorage.getItem("todos");
    if (stored) {
        const savedTodos = JSON.parse(stored);
        // Merge saved todos: update completed for existing (placeholders), add new ones
        savedTodos.forEach(saved => {
            const existing = todos.find(t => t.id === saved.id);
            if (existing) {
                existing.completed = saved.completed;
            }
            else {
                todos.push(saved);
            }
        });
    }
    // When we've fetched
    renderTodos();
}));
// Handle form submission to add a new todo
const form = document.getElementById("addForm");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const addInput = document.getElementById("addInput");
    const text = addInput.value.trim();
    if (text) {
        addTodo(text);
        saveTodos();
        renderTodos();
        addInput.value = "";
    }
});
// Handle clear button click to reset todos
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
    clearTodos();
    // Reload the page to reset to placeholder todos
    location.reload();
});
