const addTaskListForm = (div, newList) => {
  div.innerHTML += `
  <form id="create-task-form">
    <label for="parent-list">Select List:</label>
    <select id="parent-list">
    <option value="${newList.title}" selected>
    ${newList.title}
    </option>
    </select>

    <label for="new-task-description">Task description:</label>
    <input required type="text" id="new-task-description" placeholder="description">

    <label for="new-task-priority">Priority level:</label>
    <input type="text" id="new-task-priority" placeholder="priority">
    <input type="submit" value="Create New Task">
  </form>
  `
}

const addNewListToTaskListForm = (newList) => {
  const selectOption = document.getElementById("parent-list")
  selectOption.innerHTML += `
  <option value="${newList.title}" selected>
  ${newList.title}
  </option>
  `
}

const addTaskToList = (selectedListId, newTaskDescription, newTaskPriority) => {
  const taskListDiv = document.querySelector(`[data-id="${selectedListId}"]`);
  let myListTitle = listz.find(list => list.id == selectedListId).title;
  taskListDiv.innerHTML += `
  <li>
    Task: ${newTaskDescription}
    <button data-list-title="${myListTitle}" data-task-name="${newTaskDescription}" class="delete-task">
        X
    </button>
    <br>
    Priority: ${newTaskPriority}
  </li>
  `
}
