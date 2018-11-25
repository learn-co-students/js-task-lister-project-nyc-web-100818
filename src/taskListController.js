// subscribes to events passed up from the view 
// responsible for passing these events to 
// the model
class TaskListController extends EventEmitter {

  constructor(model, view) {
    super()
    this.model = model
    this.view = view

    view.subscribe('formSubmitted', event => this.addListItem(event))
    view.subscribe('deleteListClicked', event => this.deleteListItem(event))
    view.subscribe('createTaskFormSubmitted', event => this.addTask(event))
    view.subscribe('deleteTaskClicked', event => this.deleteTask(event))
  }

  addListItem(event) {
    const listName = event.target.querySelector('#new-list-title').value
    const list = new List(listName)
    this.model.addList(list) // this will emit 'listAdded' event
  }

  deleteListItem(event) {
    const listName = event.target.dataset.title
    const list = this.model.getList(listName)
    this.model.removeList(list) // this will emit 'listRemoved' event
  }

  addTask(event) {
    const listName = event.target.querySelector('#parent-list').value
    const description = event.target.querySelector('#new-task-description').value
    const priority = event.target.querySelector('#new-task-priority').value
    // get the list
    const list = this.model.getList(listName)
    // create a new Task
    const task = new Task(list, description, priority)
    list.addTask(task) // this will emit 'taskAdded' event
  }

  deleteTask(event) {
    const listName = event.target.dataset.listTitle
    const taskDescription = event.target.dataset.taskName
    // get the list
    const list = this.model.getList(listName)
    // get the task
    const task = list.tasks.find(task => task.description === taskDescription)
    
    list.removeTask(task) // this will emit 'taskRemoved' event
  }

}