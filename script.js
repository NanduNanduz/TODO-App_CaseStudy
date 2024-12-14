// Function to validate login credentials

function validateLogin(username, password, callback) {
  // Predefined username and password
  const validUsername = "admin";
  const validPassword = "12345";

  if (username === validUsername && password === validPassword) {
    callback(true); // Credentials are valid, call the callback with true
  } else {
    callback(false); // Credentials are invalid, call the callback with false
  }
}

// Event listener for the login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get username and password values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Call validateLogin with a callback function
    validateLogin(username, password, function (isValid) {
      if (isValid) {
        // Redirect to main page if login is valid
        window.location.href = "todoList.html";
      } else {
        // Show an error message if login is invalid
        alert("Invalid username or password. Please try again.");
      }
    });
  });
