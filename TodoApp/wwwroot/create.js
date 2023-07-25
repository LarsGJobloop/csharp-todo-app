/**
 * A Todo item
 * @typedef {{
 * id: number,
 * name?: string,
 * isComplete: boolean
 * }} Todo
 */

/**
 * Creates a single Todo element
 * 
 * @param {Todo} todo 
 */
function createTodo(todo) {
  const todoElement = document.createElement("li")
  todoElement.className = "todo-item" + (todo.isComplete ? " complete" : "")

  todoElement.innerHTML = `<p>${todo.name}</p>`

  return todoElement
}

/**
 * Generates a list of elements and attaches it to a node
 * 
 * The <ul> element to attach the list to
 * @param {HTMLUListElement} root
 * @param {Todo[]} todoList
 */
export function createTodoList(root, todoList) {
  if(!root) {
    console.error("Could not find root element")
    return
  }

  const list = document.createDocumentFragment()

  todoList.forEach(todo => list.appendChild(createTodo(todo)))

  root.appendChild(list);
}