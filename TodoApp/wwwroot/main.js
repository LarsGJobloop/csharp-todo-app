import { getAllTodoes, createTodo } from "./api.js"
import { renderTodoList } from "./create.js"

// Render todo list
async function render() {
  const todoList = await getAllTodoes()
  renderTodoList(todoListRoot, todoList)
}

const todoListRoot = document.getElementById("todoes")
render()

// Submit Formdata
const todoForm = document.getElementById("todoForm")
todoForm.addEventListener("submit", async event => {
  event.preventDefault()
  const formElement = event.target

  const formData = new FormData(formElement)

  let data = {}
  for( const [key, value] of formData.entries()) {
    data[key] = value
  }
  await createTodo(data.name)

  formElement.reset()

  render()
})