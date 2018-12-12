listz = [];

class List {

  constructor(title) {
    this.id = List.incrementId()
    this.title = title;
    listz.push(this);
  }

  innerHTML() {
    return `
    <div data-id="${this.id}">
      <h2>${this.title}
        <button data-title="${this.title}" class="delete-list">
          X
        </button>
      </h2>
      <ul id="task-list-div">
      </ul>
    </div>
    `
  }
  static incrementId() {
    if (!this.latestId) this.latestId = 0
    else this.latestId++
    return this.latestId
  }

}
