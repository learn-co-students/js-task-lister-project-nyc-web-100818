class TaskListModel extends EventEmitter {
  constructor() {
    super() // initialize EventEmitter
    this.lists = [] // initialize with empty array
  }

  // adds a task and emits taskAdded to subscribers
  addList(list) {
    this.lists.push(list)

    // subscribe to events for tasks to pass to view
    list.subscribe('taskAdded', task => this.emit('taskAdded', task))
    list.subscribe('taskRemoved', task => this.emit('taskRemoved', task))

    this.emit('listAdded', list)
  }

  // removes a task and emits taskRemoved to subscribers
  removeList(listToRemove) {
    this.lists = this.lists.filter(list => list !== listToRemove)

    // is unsubscribe needed?

    this.emit('listRemoved', listToRemove)
  }

  // get list by name
  getList(listName) {
    return this.lists.find(list => list.name === listName)
  }
  
}