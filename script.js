const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let tasks = []; 

getTasks();

function getTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();
}

function addTask(taskText) {
  let newTaskObj = {
    id: Date.now(),
    text: taskText,
    isCompleted: false,
  };

  tasks.push(newTaskObj);
  renderTasks();

  userInput.value = "";

  saveTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
  saveTasks();
}

function toggleTask(id) {
  let task = tasks.find(t => t.id === id);
  if (task) {
    task.isCompleted = !task.isCompleted;
  }
  renderTasks();
  saveTasks();
}

function renderTasks() {
  todoList.innerHTML = ""; 

  tasks.forEach(task => {
    let li = document.createElement("li");
    li.textContent = task.text; 

    li.classList.toggle("completed", task.isCompleted);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    });

    li.addEventListener("click", () => {
      console.log("clicked");
      toggleTask(task.id);
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", () => {
  let userInputvalue = userInput.value;
  if (userInputvalue === "") return; 

  addTask(userInputvalue);
});
