// responsible for listsening to events from the DOM 
// and emitting them to the controller
// as well as listening for events from the model and updating the DOM
class TaskListView extends EventEmitter {
  
  constructor(model, elements) {
    super()
    this.model = model // task list model
    this.elements = elements // DOM elements for the view to handle logic

    // model listeners - rebuild lists when model is changed
    model.subscribe('listAdded', list => this.rebuildLists())
    model.subscribe('listRemoved', list => this.rebuildLists())
    
    // should these have their own view and controller? probably!
    // that controller and view would be instantiated when a new list is added
    model.subscribe('taskAdded', list => this.rebuildTasks(list))
    model.subscribe('taskRemoved', list => this.rebuildTasks(list))
    
    // DOM event listeners -> EventEmitters, handled by controller
    elements.form.addEventListener('submit', event => {
      event.preventDefault()
      this.emit('formSubmitted', event)
    })
    elements.content.addEventListener('click', event => {
      if (event.target.className === "delete-list") {
        this.emit('deleteListClicked', event)
      } else if (event.target.className === "delete-task") {
        this.emit('deleteTaskClicked', event)
      }
    })
    elements.content.addEventListener('submit', event => {
      if (event.target.id === 'create-task-form') {
        event.preventDefault()
        this.emit('createTaskFormSubmitted', event)
      }
    })
  }

  render() {
    this.rebuildLists()
  }

  rebuildLists() {
    this.elements.content.innerHTML = ''
    if (this.model.lists.length) {
      this.elements.content.innerHTML = this.listFormTemplate()
      this.elements.content.innerHTML += this.listTemplates()
    }
    this.model.lists.forEach(list => {
      this.rebuildTasks(list)
    })
  }

  rebuildTasks(list) {
    const listElem = this.elements.content.querySelector(`div[data-name='${list.name}']`)
    const ulElem = listElem.querySelector('ul')
    ulElem.innerHTML = this.taskTemplates(list)
  }

  // template view for one list item
  // move to separate template file?
  listTemplates() {
    const listElements = this.model.lists.map(list =>
      `<div data-name="${list.name}">
        <h2>${list.name}
          <button data-title="${list.name}" class="delete-list">X</button>
        </h2>
        <ul>
        </ul>
      </div>`
    )
    return `<div id="lists">${listElements.join("")}</div>`    
  }

  taskTemplates(list) {
    return list.tasks.map(task => 
      ` <li>
          Task: ${task.description}
          <button data-list-title="${list.name}" data-task-name="${task.description}" class="delete-task">
            X
          </button>
          <br>
          Priority: ${task.priority}
        </li>`).join(" ")
  }

  listFormTemplate() {
    const listOptions = this.model.lists.map(list => `<option value='${list.name}'>${list.name}</option>`)
    return `<form id="create-task-form" >
              <label for="parent-list">Select List:</label>
              <select id="parent-list">
                ${listOptions.join(" ")}
              </select>
              <label for="new-task-description">Task description:</label>
              <input required type="text" id="new-task-description" placeholder="description">
              <label for="new-task-priority">Priority level:</label>
              <input type="text" id="new-task-priority" placeholder="priority">
              <input type="submit" value="Create New Task">
            </form>`
  }
}