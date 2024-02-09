  document.addEventListener("DOMContentLoaded", function() {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  addTaskBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    }
  });

  taskList.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteBtn")) {
      event.target.parentElement.remove();
      saveTasks();
    }
  });

  function addTask(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${taskText}</span>
      <button class="deleteBtn">Delete</button>
    `;
    taskList.appendChild(li);
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(function(task) {
      tasks.push(task.querySelector("span").innerText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      tasks.forEach(function(task) {
        addTask(task);
      });
    }
  }

  loadTasks();
});
