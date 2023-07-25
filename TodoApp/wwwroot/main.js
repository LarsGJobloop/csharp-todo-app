import { getAllTodoes, createTodo } from "./api.js"
import { createTodoList } from "./create.js"

// Create todo list
const todoList = await getAllTodoes()
const todoListRoot = document.getElementById("todoes")
createTodoList(todoListRoot, todoList)

// Submit Formdata
const todoForm = document.getElementById("todoForm")
todoForm.addEventListener("submit", async event => {
  event.preventDefault()

  const formData = new FormData(event.target)

  let data = {}
  for( const [key, value] of formData.entries()) {
    data[key] = value
  }
  console.log(data.name)
  createTodo(data.name)
})