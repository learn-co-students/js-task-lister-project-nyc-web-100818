document.addEventListener('DOMContentLoaded', () => {
  const taskListModel = new TaskListModel(),
        taskListView = new TaskListView(taskListModel, {
          form: document.getElementById('create-list-form'),
          content: document.getElementById('app-content')
        }), 
        taskListController = new TaskListController(taskListModel, taskListView)
});
