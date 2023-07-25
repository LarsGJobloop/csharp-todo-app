async function customFetch(endpoint, options,) {
  const response = await fetch(endpoint, options)

  if(!response.ok) {
    return `${options.method} request to ${endpoint} failed`
  }

  const data = await response.json()

  return data
}

// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems	          Get all to-do items     	  None      	Array of to-do items
export async function getAllTodoes() {
  const headers = new Headers()

  const options = {
    method: "GET",
    headers,
  }

  return await customFetch("/todoitems", options)
}
// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems/complete	  Get completed to-do items	  None      	Array of to-do items
export async function getCompletedTodos() {
  const headers = new Headers()

  const options = {
    method: "GET",
    headers,
  }

  return await customFetch("/todoitems/complete", options)
}

// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems/{id}	      Get an item by ID	          None	      To-do item
export async function getTodo(id) {
  const headers = new Headers()

  const options = {
    method: "GET",
    headers,
  }

  return await customFetch(`/todoitems/${id}`, options)
}

// VERB   Endpoint         	    Description       	        Body	      Return Type
// POST   /todoitems	          Add a new item	            To-do item	To-do item
let uniqueId = 0;
/**
 * @param {name: string} todo
 */
export async function createTodo(todo) {
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

// VERB   Endpoint         	    Description       	        Body	      Return Type
// PUT    /todoitems/{id}	      Update an existing item  	  To-do item	None
/**
 * @param {name: string} todo
 */
export async function updateTodo(id, todo) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({Id: id, Name: todo, IsComplete: false})
  }

  return await customFetch(`/todoitems/${id}`, options)
}

// VERB   Endpoint         	    Description       	        Body	      Return Type
// DELETE /todoitems/{id}    	  Delete an item    	        None	      None
export async function deleteTodo(id) {
  const headers = new Headers()

  const options = {
    method: "DELETE",
    headers,
  }

  return await customFetch(`/todoitems/${id}`, options)
}


// ==================== Tests =======================
Promise.allSettled([
  () => "Get all todoes:\n",
  () => getAllTodoes(),

  () => "\nCreate todoes:\n",
  () => createTodo("Walk dog"),
  () => createTodo("Mince meat"),
  () => createTodo("Feed shark"),
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