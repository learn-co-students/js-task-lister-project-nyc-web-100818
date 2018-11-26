class List {
  constructor(name) {
    this.name = name
    this.selected = true
    this.tasks = []
  }

  addTask(task) {
    this.tasks.push(task)
  }

  removeTask(task) {
    this.tasks = this.tasks.filter(t => t !== task)
  }

  findTask(taskDescription) {
    return this.tasks.find(task => task.description === taskDescription)
  }

  renderDiv() {
    const taskElements = this.tasks.map(task => task.renderLi()).join("")
    return `<div data-name="${this.name}">
              <h2>${this.name}
                <button data-title="${this.name}" class="delete-list">X</button>
              </h2>
              <ul>${taskElements}</ul>
            </div>`
  }

  renderOption() {
    return `<option value="${this.name}" ${(this.selected ? "selected" : "")}>${this.name}</option>`
  }
  
}