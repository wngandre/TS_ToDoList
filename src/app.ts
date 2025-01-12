interface User {
  username: string;
  password: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
  user: string;
}

let currentUser: string | null = null;
let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

// Fonction pour créer un compte

function register() {
  const username = (
    document.getElementById("register-username") as HTMLInputElement
  ).value;
  const password = (
    document.getElementById("register-password") as HTMLInputElement
  ).value;
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.find((user) => user.username === username)) {
    alert("User already exists!");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("User registered successfully!");
}

// Fonction pour se connecter

function login() {
  const username = (
    document.getElementById("login-username") as HTMLInputElement
  ).value;
  const password = (
    document.getElementById("login-password") as HTMLInputElement
  ).value;
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  if (
    users.find(
      (user) => user.username === username && user.password === password
    )
  ) {
    currentUser = username;
    document.getElementById("auth")!.style.display = "none";
    document.getElementById("todo")!.style.display = "block";
    renderTasks();
  } else {
    alert("Invalid credentials!");
  }
}

// fonction pour se déconnecter

function logout() {
  currentUser = null;
  document.getElementById("auth")!.style.display = "block";
  document.getElementById("todo")!.style.display = "none";
}

// Ajouter une tâche

function addTask() {
  const title = (document.getElementById("task-title") as HTMLInputElement)
    .value;
  const description = (
    document.getElementById("task-description") as HTMLInputElement
  ).value;
  const deadline = (
    document.getElementById("task-deadline") as HTMLInputElement
  ).value;

  const task: Task = {
    id: Date.now(),
    title,
    description,
    status: "pending",
    deadline,
    user: currentUser!,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Fonction pour reinitaliser le localStorage (Comptes + Tâches)

function resetLocalStorage() {
  localStorage.clear();
  alert("Le localStorage a été réinitialisé.");
  tasks = [];
  currentUser = null;
  document.getElementById("auth")!.style.display = "block";
  document.getElementById("todo")!.style.display = "none";
  renderTasks();
}

// Fonction pour afficher les tâches

function renderTasks() {
  const tasksTodo = document.getElementById("tasks-todo")!;
  const tasksCompleted = document.getElementById("tasks-completed")!;
  tasksTodo.innerHTML = "";
  tasksCompleted.innerHTML = "";

  tasks
    .filter((task) => task.user === currentUser)
    .forEach((task) => {
      const li = document.createElement("li");
      li.textContent = `${task.title} - ${task.description} - ${task.deadline}`;

      if (task.status === "pending") {
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = () => completeTask(task.id);
        li.appendChild(completeButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = () => deleteTask(task.id);
        li.appendChild(deleteButton);

        tasksTodo.appendChild(li);
      } else {
        li.classList.add("completed");
        tasksCompleted.appendChild(li);
      }
    });
}

// Fonction pour compléter une tâche

function completeTask(id: number) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, status: "completed" } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(id: number) {
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});
