const API = "http://localhost:5000";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateClock(){

  const now = new Date();

  document.getElementById("clock").innerHTML =
    now.toLocaleString();

}

setInterval(updateClock,1000);

updateClock();

async function register(){

  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/register`,{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({
      name,
      email,
      password
    })

  });

  const data = await res.json();

  alert(data.msg);

}

async function login(){

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`,{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({
      email,
      password
    })

  });

  const data = await res.json();

  if(data.success){

    window.location.href = "dashboard.html";

  }
  else{

    alert(data.msg);

  }

}

function saveTasks(){

  localStorage.setItem("tasks",JSON.stringify(tasks));

}

function renderTasks(){

  const taskList = document.getElementById("taskList");

  const taskCount = document.getElementById("taskCount");

  if(!taskList) return;

  taskList.innerHTML = "";

  taskCount.innerHTML = tasks.length;

  tasks.forEach((task,index)=>{

    const div = document.createElement("div");

    div.classList.add("task");

    if(task.completed){
      div.classList.add("completed");
    }

    div.innerHTML = `
      <h3>${task.name}</h3>

      <p><strong>Time:</strong> ${task.time}</p>

      <p><strong>Priority:</strong> ${task.priority}</p>

      <button class="complete-btn"
      onclick="completeTask(${index})">
      Complete
      </button>

      <button class="delete-btn"
      onclick="deleteTask(${index})">
      Delete
      </button>
    `;

    taskList.appendChild(div);

  });

}

function addTask(){

  const taskInput =
    document.getElementById("taskInput");

  const taskTime =
    document.getElementById("taskTime");

  const priority =
    document.getElementById("priority");

  if(taskInput.value === ""){
    alert("Enter task");
    return;
  }

  tasks.push({
    name:taskInput.value,
    time:taskTime.value,
    priority:priority.value,
    completed:false
  });

  saveTasks();

  renderTasks();

  taskInput.value = "";

}

function deleteTask(index){

  tasks.splice(index,1);

  saveTasks();

  renderTasks();

}

function completeTask(index){

  tasks[index].completed =
    !tasks[index].completed;

  saveTasks();

  renderTasks();

}

renderTasks();