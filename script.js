let tasksAdded = [];

let tasksContainer = document.getElementById('task-container')
let quoteText = document.getElementById('quote');
let authorText = document.getElementById('author');

// newQuote();

function displayTasks() {
  let taskList = document.createElement('div');
  taskList.classList.add('task-list');

  let taskToDo = document.createElement('div');
  taskToDo.classList.add('task-todo');

  let taskCheckbox = document.createElement('INPUT');
  taskCheckbox.setAttribute("type", "checkbox");

  let taskText = document.createElement('p');
  taskText.innerHTML = tasksAdded[tasksAdded.length-1];
  console.log(taskText)

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

function writeSomethingAlert(){
  let alert = document.getElementById('writeSomethingAlert');
  alert.classList.remove('writeSomething');
  alert.classList.add('writeSomethingAlert');

  setTimeout(() => {
    alert.classList.remove('writeSomethingAlert');
    alert.classList.add('writeSomething');
  }, 3000);
}

function wordCountAlert(){
  let alert = document.getElementById('wordCountAlert');
  alert.classList.remove('wordCount');
  alert.classList.add('wordCountAlert');

  setTimeout(() => {
    alert.classList.remove('wordCountAlert');
    alert.classList.add('wordCount');
  }, 3000);
}

function addTask() {
  let tasks = document.getElementById("todo-input").value;
  let inputWords = tasks.trim().split(/\s+/);
  let wordCount = inputWords.length;
  if (tasks=="") {
    writeSomethingAlert();
  } 
  else if (wordCount < 3) {
    wordCountAlert();
  }
  
  else {
    tasksAdded.push(tasks);
    displayTasks();
    document.getElementById("todo-input").value = ""; 
    console.log(tasksAdded);
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

let getNewQuote = async () => {
  // URL for the quotes API
  var url = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  // Fetch data from the API
  let response = await fetch(url);

  // Convert response to JSON
  let quotesArray = await response.json();

  // Ensure we fetched an array and it has content
  if (Array.isArray(quotesArray) && quotesArray.length > 0) {
    // Generate a random index
    let randomIndex = Math.floor(Math.random() * quotesArray.length);

    // Access the selected quote and author
    let selectedQuote = quotesArray[randomIndex];
    let quote = selectedQuote.text;
    let author = selectedQuote.author;

    // Fallback for undefined or null author
    if (!author) {
      author = "Anonymous";
    }

    // Display the quote and author in the DOM
    quoteText.innerHTML = `"${quote}"`;
    authorText.innerHTML = `- ${author}`;
  } else {
    // Handle empty array case
    quoteText.innerHTML = "No quotes available.";
    authorText.innerHTML = "";
  }
};

// Fetch and display a new quote
getNewQuote();
