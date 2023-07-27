/**
 * Creates a new todo card
 * 
 * @param {{
 *  data: import("./api").Todo,
 *  removeThis: () => void,
 *  toggleComplete: () => void,
 * }} createInfo
 */
export function createTodoCard({data, removeThis, toggleComplete}) {
  const liElement = document.createElement("li")
  liElement.className = "todo-card" + (data.isComplete ? " complete" : "")

  const pElement = document.createElement("p")
  pElement.textContent = data.name ?? data.id
  liElement.appendChild(pElement)

  const deleteButton = document.createElement("button")
  deleteButton.textContent = "Delete"
  deleteButton.addEventListener("click", removeThis)
  liElement.appendChild(deleteButton)

  liElement.addEventListener("click", toggleComplete)

  return liElement
}

/**
 * Returns the formdata as an object
 * 
 * @param {HTMLFormElement} formElement 
 */
export function parseFormData(formElement) {
  let formData = {}

  new FormData(formElement).forEach((value, key) => formData[key] = value)

  return formData
}

/**
 * Clears all children of node
 * 
 * @param {HTMLElement} node 
 */
export function clearChildNodes(node) {
  while(node.firstChild) {
    node.lastChild.remove()
  }
}