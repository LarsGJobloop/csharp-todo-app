import { createTodoCard, clearChildNodes } from './utilis.js'

/**
 * @param {import('./api.js')} api
 */
export async function TodoList(api) {
  const root = document.getElementById("todoes")
  let todoes = await api.getAllTodoes()
  /**
   * Renders the current list
   * use if you mutate the list or the list is not in the DOM
   */
  function render() {
    clearChildNodes(root)
    const fragment = document.createDocumentFragment()

    todoes.forEach(todo => fragment.appendChild(createTodoCard({
      data: todo,
      removeThis: (event) => removeTodo(todo.id, event),
      toggleComplete: (event) => toggleComplete(todo.id, todo, event)
    })))
    
    root.appendChild(fragment)
  }

  /**
   * Queries the backend for updates to the db
   */
  async function update() {
    todoes = await api.getAllTodoes()
    render();
  }

  /**
   * 
   * @param {number} id 
   * @param {Event} event 
   */
  async function removeTodo(id, event) {
    event.stopPropagation()
    await api.deleteTodo(id)
    update()
  }

  /**
   * 
   * @param {number} id 
   * @param {import('./api.js').Todo} oldTodo
   * @param {Event} event 
   */
  async function toggleComplete(id, oldTodo, event) {
    event.stopPropagation()
    const newData = {name: oldTodo.name, isComplete: !oldTodo.isComplete}
    await api.updateTodo(id, newData)
    update()
  }

  /**
   * @param {"IdAscending" | "IdDescending"} pattern
   */
  function sort(pattern) {
    switch (pattern) {
      case "IdAscending":
        todoes.sort((a, b) => a.id - b.id)
        break;
      case "IdDescending":
        todoes.sort((a, b) => b.id - a.id)
        break;
    }

    render()
  }

  render()

  return {
    update,
    sort,
  }
}
