document.addEventListener('DOMContentLoaded', () => {

  const appContent = document.getElementById("app-content");
  const createListForm = document.getElementById("create-list-form");
  const newListTitle = document.getElementById("new-list-title");

  createListForm.addEventListener('submit', (event) => {
    let taskForm = document.getElementById("create-task-form")
    event.preventDefault();
    let userInput = newListTitle.value;
    let newList = "";
    if (listz.find(list => list.title == userInput) != undefined) {
      newList = listz.find(list => list.title == userInput);
      createListForm.reset()
      return window.alert(`${userInput} already exists!`)
    } else {
      newList = new List(userInput);
    }
    if (taskForm == null) {
      addTaskListForm(appContent, newList);
    } else {
      addNewListToTaskListForm(newList);
    }
    appContent.innerHTML += `<div id="lists"></div>`;
    const listsDiv = document.getElementById("lists")  // REFACTOR PLZ
    listsDiv.innerHTML += newList.innerHTML()
    createListForm.reset()
  })

  document.addEventListener('submit', (event) => {
    if (event.target.id == "create-task-form") {
      event.preventDefault();
      const taskForm = document.getElementById("create-task-form")
      const newTaskDescription = document.getElementById("new-task-description").value;
      const newTaskPriority = document.getElementById("new-task-priority").value;
      const selectedListTitle = document.getElementById("parent-list").value
      const selectedListId = listz.find(list => list.title == selectedListTitle).id
      console.log(selectedListId);
      addTaskToList(selectedListId, newTaskDescription, newTaskPriority)
      taskForm.reset()
    }
  })

  document.addEventListener("click", (event) => {
    if (event.target.className == "delete-task") {
      event.target.parentElement.remove()
    } else if (event.target.className == "delete-list") {
      event.target.parentElement.parentElement.remove()
      let listId = listz.find(list => event.target.dataset.title == list.title).id
      listz.splice(listId, 1)
    }
  })
});
