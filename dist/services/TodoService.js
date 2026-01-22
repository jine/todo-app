var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Fetch placeholder todos from the JSON file.
 * @returns Promise resolving to array of Todo items
 */
export function getTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('./todos.json');
        const data = yield response.json();
        return data;
    });
}
/**
 * Add a new todo item to the list.
 * @param todos - The array to add the todo to
 * @param addText - The text for the new todo
 */
export function addTodo(todos, addText) {
    //todos.push({ id: Date.now(), text: addText}); // Use unixtimestamp in ms as id
    todos.push({ id: crypto.randomUUID(), text: addText });
}
