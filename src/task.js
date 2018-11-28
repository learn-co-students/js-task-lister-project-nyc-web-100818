const taskz = [];

class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
    taskz.push(this);
  }
}
