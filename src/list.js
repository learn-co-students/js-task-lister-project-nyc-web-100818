class List extends EventEmitter {
  constructor(name) {
    super()
    this.name = name
    this.tasks = []
  }

  // adds a task and emits taskAdded to subscribers
  addTask(task) {
    this.tasks.push(task)
    this.emit('taskAdded', this)
  }

  // removes a task and emits taskRemoved to subscribers
  removeTask(taskToRemove) {
    this.tasks = this.tasks.filter(task => task !== taskToRemove)
    this.emit('taskRemoved', this)
  }
 
}