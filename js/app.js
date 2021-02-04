var list = document.querySelector(".todo-list");
var input = document.querySelector('#todo_app input');
var saveButton = document.querySelector("button.save");
var clearButton = document.querySelector("button.clear");
var showTipsButton = document.querySelector("button.showTips");
var closeTipsButton = document.querySelector("a.closeTips");
var overlay = document.querySelector("#overlay");

function loadTodos() {
    var data = localStorage.getItem("todo");
    if (data) {
        list.innerHTML = data;
    }
    var deleteButtons = document.querySelectorAll("span.todo-trash");
    for (var button of deleteButtons) {
        listenDeleteTodo(button);
    }
}
loadTodos();

function createTodo() {
    var li = document.createElement("li");
    var textSpan = document.createElement("span");
    textSpan.classList.add("todo-text");
    var newTodo = input.value;
    textSpan.append(newTodo);

    var deleteBtn = document.createElement("span");
    deleteBtn.classList.add("todo-close");
    var icon = document.createTextNode("\u00D7");;
    deleteBtn.appendChild(icon);

    list.appendChild(li).append(textSpan, deleteBtn);
    input.value = "";
    listenDeleteTodo(deleteBtn);
}

function listenDeleteTodo(listItem) {
    listItem.addEventListener("click", (event) => {
        listItem.parentElement.remove();
        event.stopPropagation();
    });
}



input.addEventListener('keydown', function (event) {
    if (event.keyCode != 13) {
        return; 
    }
    createTodo();
});

// Add a "checked" symbol when clicking on a list item
list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
  }
}, false);

saveButton.addEventListener("click", () => {
    localStorage.setItem("todo", list.innerHTML);
});
clearButton.addEventListener("click", () => {
    list.innerHTML = "";
    localStorage.removeItem('todo', list.innerHTML);
});