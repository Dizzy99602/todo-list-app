import './styles.css';

// Load projects from localStorage or initialize an empty array
let projects = JSON.parse(localStorage.getItem("projects")) || [];

// Function to save projects to localStorage
function saveProjectsToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// Function to create a new project
function createProject(projectName) {
  if (projectName) {
    projects.push({ name: projectName, tasks: [] });
    saveProjectsToLocalStorage();
    renderProjects();
  } else {
    alert("Project name cannot be empty!");
  }
}

// Function to add a task to a specific project
function addTaskToProject(index, taskName) {
  if (taskName) {
    projects[index].tasks.push(taskName);
    saveProjectsToLocalStorage();
    renderProjects();
  } else {
    alert("Task name cannot be empty!");
  }
}

// Function to delete a specific task from a project
function deleteTask(projectIndex, taskIndex) {
  projects[projectIndex].tasks.splice(taskIndex, 1);
  saveProjectsToLocalStorage();
  renderProjects();
}

// Function to delete a project
function deleteProject(index) {
  projects.splice(index, 1);
  saveProjectsToLocalStorage();
  renderProjects();
}

// Function to render all projects and tasks
function renderProjects() {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = ""; // Clear existing projects

  projects.forEach((project, projectIndex) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");

    // Create project title and delete button
    const projectHeader = document.createElement("h3");
    projectHeader.textContent = project.name;

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.textContent = "Delete Project";
    deleteProjectBtn.classList.add("delete-project-btn");
    deleteProjectBtn.addEventListener("click", () => deleteProject(projectIndex));

    projectHeader.appendChild(deleteProjectBtn);
    projectDiv.appendChild(projectHeader);

    // Create task input and add button
    const taskRow = document.createElement("div");
    taskRow.classList.add("row");

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.placeholder = "Add your task";

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task";
    addTaskBtn.addEventListener("click", () => addTaskToProject(projectIndex, taskInput.value));

    taskRow.appendChild(taskInput);
    taskRow.appendChild(addTaskBtn);
    projectDiv.appendChild(taskRow);

    // Create task list
    const taskList = document.createElement("ul");
    project.tasks.forEach((task, taskIndex) => {
      const taskItem = document.createElement("li");
      taskItem.textContent = task;

      const deleteTaskBtn = document.createElement("button");
      deleteTaskBtn.textContent = "Delete";
      deleteTaskBtn.classList.add("delete-task-btn");
      deleteTaskBtn.addEventListener("click", () => deleteTask(projectIndex, taskIndex));

      taskItem.appendChild(deleteTaskBtn);
      taskList.appendChild(taskItem);
    });

    projectDiv.appendChild(taskList);
    projectList.appendChild(projectDiv);
  });
}

// Add event listener to the "Add Project" button
document.getElementById("add-project-btn").addEventListener("click", () => {
  const projectName = document.getElementById("project-name").value;
  document.getElementById("project-name").value = ""; // Clear input field
  createProject(projectName);
});

// Initialize the app by rendering projects from localStorage
renderProjects();
