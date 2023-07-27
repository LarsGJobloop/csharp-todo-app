import * as api from "./api.js";
import { parseFormData } from "./utilis.js"
import {TodoList} from "./todolist.js"

const todoList = await TodoList(api)

// Submit Todo
/**
 * @this {HTMLFormElement}
 * @param {SubmitEvent} event 
 */
async function submitTodo(event) {
  event.preventDefault()

  const newTodo = parseFormData(this)
  await api.createTodo(newTodo)

  this.reset()

  todoList.update()
}
document.getElementById("todoForm").addEventListener("submit", submitTodo)



// Sorting
document.getElementById("IdAscending").addEventListener("click", () => todoList.sort("IdAscending"))
document.getElementById("IdDescending").addEventListener("click", () => todoList.sort("IdDescending"))