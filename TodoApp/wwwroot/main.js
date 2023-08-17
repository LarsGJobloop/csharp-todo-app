const todoForm = document.getElementById("todoForm")
todoForm.addEventListener("submit", createTodo)

/**
 * @param {SubmitEvent} submitEvent
 */
async function createTodo(submitEvent) {
  submitEvent.preventDefault()
  const todoData = parseFormData(submitEvent.target)

  const response = await fetch(
    "http://localhost:5048/todoitems",
    {
      method: "POST",
      body: JSON.stringify(todoData),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )

  if (!response.status === 201) {
    console.error("Server responded with status: " + response.status)
    return
  }

  const data = await response.json()

  createTodoCard(data)
}

const getAllTodoesButton = document.getElementById("getAllTodes")
getAllTodoesButton.addEventListener("click", getAllTodes)

async function getAllTodes() {
  try {
    const response = await fetch("http://localhost:5048/todoitems")
    const data = await response.json()
    console.log(data)
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

function parseFormData(formElement) {
  const raw = new FormData(formElement)

  let formData = {}

  raw.forEach((value, key) => {
    formData[key] = value
  })

  return formData
}

function createTodoCard(todoData) {
  console.log(todoData)
}
