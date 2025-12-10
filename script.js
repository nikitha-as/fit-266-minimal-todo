const todoForm = document.getElementById("todo-form");
const todoContainer = document.getElementById("todo-container");
const todosLength = document.getElementById("todo-length");
const remainingTodos = document.getElementById("remaining-todos");

let todoList = document.createElement("ul");
todoList.classList.add("todo-list");
let todos = [];
let todoCount = 0;
let todoItem;

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  try {
    let todoValue = document.getElementById("add-todo").value;
    todoCount = todoCount + 1;

    let todoId = `todo-${Date.now()}`;

    todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.id = todoId;

    const todoDetails = document.createElement("div");
    todoDetails.classList.add("todo-details");

    let todoStatusValue = false;
    const todoStatus = document.createElement("input");
    todoStatus.type = "checkbox";
    todoStatus.id = `todo-status-${Date.now()}`;
    todoStatus.classList.add("todo-status");
    todoStatus.name = "todo-status";
    todoStatus.checked = todoStatusValue;

    todoStatus.addEventListener("change", function () {
      if (todoStatus.checked) {
        todoTitle.style.textDecoration = "line-through";
        todoCount = todoCount - 1;
        displayTodoSize();
      } else {
        todoTitle.style.textDecoration = "none";
        todoCount = todoCount + 1;
        displayTodoSize();
      }
    });

    todoDetails.append(todoStatus);

    const todoTitle = document.createElement("div");
    todoTitle.classList.add("todo-title");
    todoTitle.innerText = todoValue;
    todoDetails.appendChild(todoTitle);

    todoItem.append(todoDetails);

    todoTitle.addEventListener("click", function (e) {
      if (todoStatus.checked != true) {
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = todoValue;

        todoTitle.replaceWith(inputField);
        inputField.focus();

        function saveTodo() {
          todoValue = inputField.value;
          todoTitle.innerText = todoValue;
          inputField.replaceWith(todoTitle);
        }

        inputField.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            saveTodo();
          }
        });
      }
    });

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "x";
    removeBtn.classList.add("remove-btn");
    todoItem.appendChild(removeBtn);

    removeBtn.addEventListener("click", function (e) {
      const item = e.target.closest(".todo-item");
      item.remove();

      if (!todoStatus.checked && todoCount > 0) {
        todoCount = todoCount - 1;
        displayTodoSize();
      }
    });

    todoList.appendChild(todoItem);
    todoContainer.appendChild(todoList);

    todos.push({
      title: todoTitle.textContent,
      id: todoId,
      createdAt: Date.now(),
    });

    document.getElementById("add-todo").value = "";
    displayTodoSize();

    setTimeout(() => {
      todoItem.classList.add("show");
    }, 10);
  } catch (error) {
    console.log(error);
  }
});

function displayTodoSize() {
  todosLength.innerText = todoCount;

  if (todoCount > 0) {
    remainingTodos.style.display = "block";
  }
}
