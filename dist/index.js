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
const placeholderTodos = [
    { id: '1', text: 'Learn TypeScript', completed: true },
    { id: '2', text: 'Build a todo app', completed: false },
    { id: '3', text: 'Deploy to Coolify', completed: false },
];
// Start with an empty array of todos
let todos = [];
// App-container
const container = document.getElementById("app");
function fetchTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        //const { placeholderTodos } = placeholderTodos;
        todos = placeholderTodos;
        return todos;
    });
}
function addTodo(addText) {
    //todos.push({ todoId: Date.now(), todoText: text});
    todos.push({ id: crypto.randomUUID(), text: addText });
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function clearTodos() {
    localStorage.setItem("todos", JSON.stringify([]));
}
// Listen for click in the entire app-element globally
if (container) {
    container.addEventListener("click", (event) => {
        // Get the actual target we've clicked on
        const target = event.target;
        // Get the closest row (li element)
        const targetRow = target.closest("li");
        if (!targetRow)
            return;
        const rowId = targetRow.dataset.id;
        toggleCompleted(rowId);
    });
}
function renderTodos() {
    const list = document.createElement("ul");
    list.classList.add("space-y-2");
    todos.forEach(({ id, text, completed }) => {
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
function toggleCompleted(id) {
    const todo = todos.find((target) => target.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}
// Load todos on page load
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    const stored = localStorage.getItem("todos");
    if (stored) {
        todos = JSON.parse(stored);
    }
    else {
        yield fetchTodos();
    }
    renderTodos();
}));
// Handle form submit
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
