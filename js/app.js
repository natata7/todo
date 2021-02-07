var list = document.querySelector(".todo-list");
var input = document.querySelector('#todo_app input');
var saveButton = document.querySelector("button.save");
var clearButton = document.querySelector("button.clear");
var showTipsButton = document.querySelector("button.showTips");
var closeTipsButton = document.querySelector("a.closeTips");
var overlay = document.querySelector("#overlay");
var allTasks = document.getElementById('All')
var activeTasks = document.getElementById('Active')
var completedTasks = document.getElementById('Completed')
var tasks = [];
var id = 1;

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

function renderListItem(item) {
    console.log(item);
    var li = document.createElement("li");
    var textSpan = document.createElement("span");
    textSpan.classList.add("todo-text");

    textSpan.dataset.indexNumber = item.id;
    textSpan.append(item.title);

    var deleteBtn = document.createElement("span");
    deleteBtn.classList.add("todo-close");
    var icon = document.createTextNode("\u00D7");;
    deleteBtn.appendChild(icon);

    list.appendChild(li).append(textSpan, deleteBtn);
    listenDeleteTodo(deleteBtn);
    counter();
}

const renderCompletedTodos = () => {

      tasks.filter(task => task.status == 'inProgress').forEach(task => {
        renderTodo(task, true);
        counter();
      });
}

function createTodo() {
    addItem();
    renderListItem(tasks[tasks.length-1]);
}

function addItem() {
    var item = {
        'id': id,
        'title':input.value,
        'priority':'normal',
        'status': 'inProgress'
    };
    
    tasks.push(item);
    input.value = "";
    id++;
}

function listenDeleteTodo(listItem) {
    listItem.addEventListener("click", (event) => {
        tasks.splice( tasks[listItem.dataset.indexNumber], 1 );
        listItem.parentElement.remove();
        event.stopPropagation();
        counter();
    });
}

input.addEventListener('keydown', function (event) {
    if (event.keyCode != 13) {
        return; 
    }
    createTodo();
});

list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    var status = tasks[(event.target.childNodes[0].dataset.indexNumber) - 1].status;
    console.log(tasks[(event.target.childNodes[0].dataset.indexNumber) - 1].status);
    if (status == 'complete') {
        tasks[event.target.childNodes[0].dataset.indexNumber - 1].status = 'inProgress';
    } else {
        tasks[event.target.childNodes[0].dataset.indexNumber - 1].status = 'complete';
    }
    event.target.classList.toggle('checked');
    counter();
  }
}, false);

saveButton.addEventListener("click", () => {
    localStorage.setItem("todo", list.innerHTML);
});

clearButton.addEventListener("click", () => {
    list.innerHTML = "";
    tasks = [];
    counter();
    localStorage.removeItem('todo', list.innerHTML);
});

function counter(){
    const itemsCounter = tasks.filter(task => task.status == 'inProgress');
    const count = document.getElementById('todosLeft');

 count.innerText = `Активные задачи ${itemsCounter.length}`

}