// Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
  // prevent form for submitting
  event.preventDefault();

  //todo div

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create Li

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // add todo to localstoreage

  saveLocalTodos(todoInput.value);

  //check mark button

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-regular fa-square-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Trash button

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append to list

  todoList.appendChild(todoDiv);

  // clear todo input value
  todoInput.value = "";
}

//--------------------------------

function deleteCheck(e) {
  const item = e.target;
  console.log(item);

  // delete todo
  if (item.classList.contains("trash-btn")) {
    const todoItem = item.parentElement;
    // animation
    todoItem.classList.add("fall");
    removeLocalTodos(todoItem);
    todoItem.addEventListener("transitionend", function () {
      todoItem.remove();
    });
  }

  // check mark
  if (item.classList.contains("complete-btn")) {
    const todoItem = item.parentElement;
    todoItem.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.nodeType === 1) {
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
        }
        break;
      case "uncompleted":
        if (todo.nodeType === 1) {
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //check do i already have todos in local storeage
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //check do i already have todos in local storeage
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create Li

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo to localstoreage

    //check mark button

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Trash button

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append to list

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  console.log(todoIndex);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
