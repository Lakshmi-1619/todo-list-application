let tasksAdded = [];

let tasksContainer = document.getElementById('task-container')

function displayTasks() {
  let taskList = document.createElement('div');
  taskList.classList.add('task-list');

  let taskToDo = document.createElement('div');
  taskToDo.classList.add('task-todo');

  let taskCheckbox = document.createElement('INPUT');
  taskCheckbox.setAttribute("type", "checkbox");

  let taskText = document.createElement('P');
  taskText.innerHTML = tasksAdded[tasksAdded.length-1];

  let iconContainer = document.createElement('div');
  iconContainer.classList.add('edit-delete-icons');

  let editIcon = document.createElement('i')
  editIcon.classList.add("fas", "fa-pen");
  editIcon.addEventListener('click', function() {
    editTask(taskText);
  });

  let deleteIcon = document.createElement('i');
  deleteIcon.classList.add("fas", "fa-trash");
  deleteIcon.addEventListener('click', function() {
    taskList.remove();
  });
  
  tasksContainer.appendChild(taskList);
  taskList.appendChild(taskToDo);
  taskToDo.appendChild(taskCheckbox);
  taskToDo.appendChild(taskText);
  taskList.appendChild(iconContainer);
  iconContainer.appendChild(editIcon);
  iconContainer.appendChild(deleteIcon);
}

function typeSomethingAlert(){
  let alert = document.getElementById('writeSomethingAlert');
  alert.classList.remove('writeSomething');
  alert.classList.add('writeSomethingAlert');

  setTimeout(() => {
    alert.classList.remove('writeSomethingAlert');
    alert.classList.add('writeSomething');
  }, 3000);
}

function addTask() {
  let tasks = document.getElementById("todo-input").value;
  if (tasks=="") {
    typeSomethingAlert();
  } else {
    tasksAdded.push(tasks);
    displayTasks();
    document.getElementById("todo-input").value = ""; 
    }
}

function editTask(taskText) {
    let currentText = taskText.innerHTML;
    let editMode = document.createElement('INPUT');
    editMode.setAttribute("type", "text");
    editMode.value = currentText;
    editMode.classList.add('edit-field');

    taskText.replaceWith(editMode);
    editMode.focus();

    editMode.addEventListener('blur', function () {
      let editedText = editMode.value;
      let newText = document.createElement('p');
      newText.innerText = editedText;

      editMode.replaceWith(newText);
      
    })
}

function changeTheme(color) {
  var colorMap = {
    pink: '#f1b2bd',
    orange: '#f3c8aa',
    green: '#bbe4b8',
    blue: '#b1d6dd',
    purple: '#bdb4d5',
    yellow: '#eee6be'
  };

  document.body.style.backgroundColor = colorMap[color];
}