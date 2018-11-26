class Task {
  constructor(list, description, priority) {
    this.list = list
    this.description = description
    this.priority = priority
  }

  renderLi() {
    return `<li>
              Task: ${this.description}
              <button data-list-title="${this.list.name}" data-task-name="${this.description}" class="delete-task">
                X
              </button>
              <br>
              Priority: ${this.priority}
            </li>`
  }
}