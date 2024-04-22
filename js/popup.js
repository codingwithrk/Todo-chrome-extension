document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addTaskButton").addEventListener("click", addTask);
    displayTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value;
    if (task === "") return;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ task: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    displayTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        const textCon = document.createElement("p");
        textCon.classList.add("text-wrap", "mb-0", "me-3");
        textCon.textContent = task.task;
        li.appendChild(textCon);

        if (task.completed) {
            textCon.classList.add("text-decoration-line-through", "text-success");
            const checkmarkIcon = document.createElement("i");
            checkmarkIcon.classList.add("bi", "bi-patch-check-fill", "text-success", "me-2");
            checkmarkIcon.setAttribute("title", "Completed");
            li.appendChild(checkmarkIcon);
        }
        li.addEventListener("click", function () {
            toggleTask(index);
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm");
        deleteButton.innerHTML = '<i class="bi bi-x-circle"></i>';
        deleteButton.addEventListener("click", function (event) {
            event.stopPropagation();
            deleteTask(index);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

