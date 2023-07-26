async function customFetch(endpoint, options,) {
  const response = await fetch(endpoint, options)

  if(!response.ok) {
    console.error(`Request failed with code: ${response.status}`)
  }

  const data = await response.json()

  return data
}

// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems	          Get all to-do items     	  None      	Array of to-do items
export async function getAllTodoes() {
  const options = {
    method: "GET"
  }

  return await customFetch("/todoitems", options)
}
// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems/complete	  Get completed to-do items	  None      	Array of to-do items
export async function getCompletedTodos() {
  const options = {
    method: "GET"
  }

  return await customFetch("/todoitems/complete", options)
}

// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems/{id}	      Get an item by ID	          None	      To-do item
export async function getTodo(id) {
  const options = {
    method: "GET",
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
  console.log("Creating new Todo\n" + `Todo: ${todo}`)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({Name: todo, IsComplete: false})
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
  const options = {
    method: "DELETE",
  }

  return await customFetch(`/todoitems/${id}`, options)
}