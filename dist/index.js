var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderTodos } from './components/TodoList.js';
import { getTodos, addTodo } from './services/TodoService.js';
import { saveTodos, clearTodos } from './utils/storage.js';
// Start with an empty array of todos
let todos = [];
// App-container
const container = document.getElementById("app");
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
/**
 * Toggle the completed status of a todo by id.
 * @param id - The id of the todo to toggle
 */
function toggleCompleted(id) {
    const todo = todos.find((target) => target.id === id);
    if (todo) {
        // Toggle the completed boolean
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos(todos, container);
    }
}
// Initialize todos on page load: load placeholders and merge saved states 
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    todos = yield getTodos();
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
    renderTodos(todos, container);
}));
// Handle form submission to add a new todo
const form = document.getElementById("addForm");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const addInput = document.getElementById("addInput");
    const text = addInput.value.trim();
    if (text) {
        addTodo(todos, text);
        saveTodos(todos);
        renderTodos(todos, container);
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
