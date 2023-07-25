async function customFetch(endpoint, options,) {
  const baseUrl = "https://localhost:7018"
  const response = await fetch(baseUrl + endpoint, options)

  if(!response.ok) {
    return `${options.method} request to ${endpoint} failed`
  }

  const data = await response.json()

  return data
}

// GET /todoitems	Get all to-do items	None	Array of to-do items
async function getAllTodoes() {
  const headers = new Headers()

  const options = {
    method: "GET",
    headers,
  }

  console.log(await customFetch("/todoitems", options))
}
getAllTodoes()

// GET /todoitems/complete	Get completed to-do items	None	Array of to-do items
async function getCompletedTodos() {
  const headers = new Headers()

  const options = {
    method: "GET",
    headers,
  }

  console.log(await customFetch("/todoitems/complete", options))
}
getCompletedTodos()

// GET /todoitems/{id}	Get an item by ID	None	To-do item
async function getTodo(id) {
  const headers = new Headers()

  const options = {
    method: "GET",
    headers,
  }

  console.log(await customFetch(`/todoitems/${id}`, options))
}
getTodo(1)
getTodo(3)

// POST /todoitems	Add a new item	To-do item	To-do item
async function createTodo() {
  const headers = new Headers()

  const options = {
    method: "POST",
    headers,
  }

  console.log(await customFetch("/todoitems", options))
}
createTodo()

// PUT /todoitems/{id}	Update an existing item  	To-do item	None
async function updateTodo(id) {
  const headers = new Headers()

  const options = {
    method: "PUT",
    headers,
  }

  console.log(await customFetch(`/todoitems/${id}`, options))
}
updateTodo(1)
updateTodo(2)

// DELETE /todoitems/{id}    	Delete an item    	None	None
async function deleteTodo(id) {
  const headers = new Headers()

  const options = {
    method: "DELETE",
    headers,
  }

  console.log(await customFetch(`/todoitems/${id}`, options))
}
deleteTodo(1)
deleteTodo(2)