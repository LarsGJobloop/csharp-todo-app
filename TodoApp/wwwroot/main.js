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

  return await customFetch("/todoitems", options)
}

// GET /todoitems/complete	Get completed to-do items	None	Array of to-do items
async function getCompletedTodos() {
  const headers = new Headers()

  const options = {
    method: "GET",
    headers,
  }

  return await customFetch("/todoitems/complete", options)
}

// GET /todoitems/{id}	Get an item by ID	None	To-do item
async function getTodo(id) {
  const headers = new Headers()

  const options = {
    method: "GET",
    headers,
  }

  return await customFetch(`/todoitems/${id}`, options)
}

// POST /todoitems	Add a new item	To-do item	To-do item
async function createTodo() {
  const headers = new Headers()

  const options = {
    method: "POST",
    headers,
  }

  return await customFetch("/todoitems", options)
}

// PUT /todoitems/{id}	Update an existing item  	To-do item	None
async function updateTodo(id) {
  const headers = new Headers()

  const options = {
    method: "PUT",
    headers,
  }

  return await customFetch(`/todoitems/${id}`, options)
}

// DELETE /todoitems/{id}    	Delete an item    	None	None
async function deleteTodo(id) {
  const headers = new Headers()

  const options = {
    method: "DELETE",
    headers,
  }

  return await customFetch(`/todoitems/${id}`, options)
}

Promise.allSettled([
  () => getAllTodoes(),
  () => getCompletedTodos(),
  () => getTodo(1),
  () => getTodo(3),
  () => createTodo(),
  () => updateTodo(1),
  () => updateTodo(2),
  () => deleteTodo(1),
  () => deleteTodo(2),
].map(request => request()))
  .then(resolved => resolved.forEach(promise => {
    console.log(promise.status + "\n" + promise.value)
  }))