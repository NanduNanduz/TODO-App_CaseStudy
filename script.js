

// Function to validate login credentials
function validateLogin(username, password, callback) {
  const validUsername = "admin";
  const validPassword = "12345";

  if (username === validUsername && password === validPassword) {
    callback(true); // Credentials are valid
  } else {
    callback(false); // Credentials are invalid
  }
}

// Login form logic (only runs on login.html)
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  
  if (loginForm) { // Check if loginForm exists
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      validateLogin(username, password, function (isValid) {
        if (isValid) {
          window.location.href = "todoList.html";
        } else {
          alert("Invalid username or password. Please try again.");
        }
      });
    });
  }
});

// Fetching Todos (only runs on todoList.html)
const apiUrl = "https://jsonplaceholder.typicode.com/todos";
let completedCount = 0;

function fetchTodos() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched Data:", data);
      displayTodos(data);
    })
    .catch((error) => console.error("Error fetching todos:", error));
}

function displayTodos(todos) {
  const tableBody = document.getElementById("todoBody");
  
  if (!tableBody) return; // Exit if tableBody doesn't exist (safe for login.html)

  tableBody.innerHTML = ""; // Clear previous data

  todos.slice(0, 50).forEach((todo) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = todo.id;
    row.insertCell(1).textContent = todo.title;
    row.insertCell(2).textContent = todo.completed ? "Yes" : "No";

    const checkboxCell = row.insertCell(3);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.disabled = todo.completed;
    checkbox.addEventListener("change", () => handleCheckboxChange(checkbox));
    checkboxCell.appendChild(checkbox);
  });
}

function handleCheckboxChange(checkbox) {
  const promise = new Promise((resolve) => {
    if (checkbox.checked) {
      completedCount++;
    } else {
      completedCount--;
    }

    if (completedCount === 5) {
      resolve();
    }
  });

  promise.then(() => {
    alert("Congrats. 5 Tasks have been Successfully Completed");
  });
}

// Run fetchTodos only if todoBody exists
document.addEventListener("DOMContentLoaded", function () {
  const todoBody = document.getElementById("todoBody");
  if (todoBody) {
    fetchTodos();
  }
});
