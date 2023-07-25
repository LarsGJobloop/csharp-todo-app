async function customFetch(endpoint, options,) {
  const response = await fetch(endpoint, options)

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
let uniqueId = 0;
/**
 * @param {name: string} todo
 */
async function createTodo(todo) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({Id: uniqueId, Name: todo, IsComplete: false})
  }

  // Increment id
  uniqueId++

  return await customFetch("/todoitems", options)
}

// PUT /todoitems/{id}	Update an existing item  	To-do item	None
/**
 * @param {name: string} todo
 */
async function updateTodo(id, todo) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({Id: id, Name: todo, IsComplete: false})
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
  () => "Get all todoes:\n",
  () => getAllTodoes(),

  () => "\nCreate todoes:\n",
  () => createTodo("Walk dog"),
  () => createTodo("Feed shark"),
  () => createTodo("Mince meat"),
  () => createTodo("Greet aliens"),

  () => "\nGet all todoes:\n",
  () => getAllTodoes(),

  () => "\nGet all completed todoes:\n",
  () => getCompletedTodos(),

  () => "\nGet single todoes:\n",
  () => getTodo(1),
  () => getTodo(3),

  () => "\nUpdate todo:\n",
  () => updateTodo(1, "Wallow in money"),
  () => updateTodo(2, "Invent the universe"),
  
  () => "\nDelet todo:\n",
  () => deleteTodo(1),
  () => deleteTodo(2),
].map(request => request()))
  .then(resolved => resolved.forEach(promise => {
    console.dir(promise.value)
  }))