document.addEventListener('DOMContentLoaded', event => {
  const form = document.getElementById('create-list-form')
  const content = document.getElementById('app-content')

  const app = new TaskLister();

  const rerender = function() {
    content.innerHTML = app.render()
  }

  // add task form event handler
  form.addEventListener('submit', event => {
    event.preventDefault()
    app.handleCreateList(event) // handle the new list added event
    rerender() // rerender the content
    event.target.reset()
  })

  content.addEventListener('change', event => {
    if (event.target.id === "parent-list") {
      app.handleSelectChanged(event)
    }
  })

  content.addEventListener('click', event => {
    if (event.target.className === 'delete-list') {
      app.handleDeleteList(event)
      rerender()
    } else if (event.target.className === 'delete-task') {
      app.handleDeleteTask(event)
      rerender()
    }
  })

  content.addEventListener('submit', event => {
    event.preventDefault()
    if (event.target.id === "create-task-form") {
      app.handleCreateTask(event)
      rerender()
    }
  })

})