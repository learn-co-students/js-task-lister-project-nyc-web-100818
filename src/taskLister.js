class TaskLister {
  constructor() {
    this.lists = [] // our app's main state
  }

  addList(list) {
    this.lists.push(list)
    this.setSelected(list)
  }

  removeList(list) {
    this.lists = this.lists.filter(l => l !== list)
  }

  findList(listName) {
    return this.lists.find(list => list.name === listName)
  }

  setSelected(list) {
    // unselect the other lists
    this.lists.forEach(list => { list.selected = false})
    list.selected = true
  }

  handleCreateList(event) {
    const listName = event.target.querySelector('#new-list-title').value
    const list = new List(listName)
    this.addList(list)
  }

  handleDeleteList(event) {
    const listName = event.target.dataset.title
    const list = this.findList(listName)
    this.removeList(list)
  }

  handleSelectChanged(event) {
    const listName = event.target.value
    const list = this.findList(listName)
    this.setSelected(list)
  }

  handleCreateTask(event) {
    const listName = event.target.querySelector('#parent-list').value
    const list = this.findList(listName)
    const description = event.target.querySelector('#new-task-description').value
    const priority = event.target.querySelector('#new-task-priority').value
    const task = new Task(list, description, priority)
    list.addTask(task)
  }

  handleDeleteTask(event) {
    const listName = event.target.dataset.listTitle
    const taskDescription = event.target.dataset.taskName
    const list = this.findList(listName)
    const task = list.findTask(taskDescription)
    list.removeTask(task)
  }

  render() {
    return this.lists.length ? `${this.renderListForm()}${this.renderLists()}` : ""
  }

  renderLists() {
    const listDivs = this.lists.map(list => list.renderDiv()).join("")
    return `<div id="lists">${listDivs}</div>` 
  }

  renderListForm() {
    const listOptions = this.lists.map(list => list.renderOption()).join("")
    return `<form id="create-task-form" >
      <label for="parent-list">Select List:</label>
      <select id="parent-list">
        ${listOptions}
      </select>
      <label for="new-task-description">Task description:</label>
      <input required type="text" id="new-task-description" placeholder="description">
      <label for="new-task-priority">Priority level:</label>
      <input type="text" id="new-task-priority" placeholder="priority">
      <input type="submit" value="Create New Task">
    </form>`
  }
}