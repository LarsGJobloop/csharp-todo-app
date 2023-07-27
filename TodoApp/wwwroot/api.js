/**
 * @typedef {{
 *  id: number,
 *  name?: string,
 *  isComplete: boolean
 * }} Todo
 */

/**
 * Convinence wrapper for the fetch API containing
 * the common logic for communicating with the backend
 * Could also be used for a centralized place for error handling
 * 
 * @param {string} endpoint 
 * @param {RequestInit?} options
 */
async function customFetch(endpoint, options,) {
  const response = await fetch(endpoint, options)

  if(!response.ok) {
    throw new Error({message: `Request failed with code: ${response.status}`, error: response.status})
  }

  return response.status !== 204 ? await response.json() : null
}

// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems	          Get all to-do items     	  None      	Array of to-do items
/**
 * @returns {Promise<Todo[]>}
 */
export async function getAllTodoes() {
  return await customFetch("/todoitems", {method: "GET"})
}
// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems/complete	  Get completed to-do items	  None      	Array of to-do items
export async function getCompletedTodos() {
  return await customFetch("/todoitems/complete", {method: "GET"})
}

// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems/{id}	      Get an item by ID	          None	      To-do item
export async function getTodo(id) {
  return await customFetch(`/todoitems/${id}`, {method: "GET"})
}

// VERB   Endpoint         	    Description       	        Body	      Return Type
// POST   /todoitems	          Add a new item	            To-do item	To-do item
/**
 * @param {{name: string}} todo
 */
export async function createTodo(todo) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({Name: todo.name, IsComplete: false})
  }
  return await customFetch("/todoitems", options)
}

// VERB   Endpoint         	    Description       	        Body	      Return Type
// PUT    /todoitems/{id}	      Update an existing item  	  To-do item	None
/**
 * @param {{name: string}} todo
 */
export async function updateTodo(id, todo) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({Name: todo.name, IsComplete: todo.isComplete})
  }

  return await customFetch(`/todoitems/${id}`, options)
}

// VERB   Endpoint         	    Description       	        Body	      Return Type
// DELETE /todoitems/{id}    	  Delete an item    	        None	      None
export async function deleteTodo(id) {
  try {
    await customFetch(`/todoitems/${id}`, {method: "DELETE"})
  } catch (error) {
    console.error(error?.message)
  }
}