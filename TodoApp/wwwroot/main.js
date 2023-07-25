import { getAllTodoes } from "./api.js"
import { createTodoList } from "./create.js"

const todoList = await getAllTodoes()
const todoListRoot = document.getElementById("todoes")
createTodoList(todoListRoot, todoList)