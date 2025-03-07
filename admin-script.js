// Function to change the theme color
function changeThemeColor() {
    let color = document.getElementById('theme-color').value;
    document.body.style.backgroundColor = color;
    alert(`Theme color changed to ${color}`);
}

// Function to add a new user (this is a simulated version)
function addUser() {
    let username = document.getElementById('username').value;
    let userEmail = document.getElementById('user-email').value;

    if (username && userEmail) {
        alert(`User ${username} with email ${userEmail} added successfully!`);
    } else {
        alert("Please enter both username and email.");
    }
}

// Function to add a new quiz (simulated for front-end example)
function addQuiz() {
    let quizTitle = document.getElementById('quiz-title').value;
    let quizDescription = document.getElementById('quiz-description').value;

    if (quizTitle && quizDescription) {
        alert(`Quiz titled "${quizTitle}" added successfully!`);
    } else {
        alert("Please fill out both quiz title and description.");
    }
}

// Function to update site settings (simulated)
function updateSettings() {
    let siteTitle = document.getElementById('site-title').value;
    let siteDescription = document.getElementById('site-description').value;

    if (siteTitle && siteDescription) {
        alert(`Site title set to "${siteTitle}" and description updated.`);
    } else {
        alert("Please enter both site title and description.");
    }
}
// Function to apply the selected theme color
function applyThemeColor() {
    let color = document.getElementById('theme-color').value;

    // Update the CSS variable to apply the new theme color
    document.documentElement.style.setProperty('--primary-color', color);

    // Optionally, save the theme color to localStorage so that it persists across sessions
    localStorage.setItem('themeColor', color);
}

// Load the theme color from localStorage (if it exists) on page load
window.onload = function() {
    let savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
        document.getElementById('theme-color').value = savedColor;
    }
};
// Apply the selected theme color and store it in localStorage
function applyThemeColor() {
    let color = document.getElementById("theme-color").value;

    // Change the CSS variable for primary color
    document.documentElement.style.setProperty('--primary-color', color);

    // Store the selected color in localStorage to persist across page reloads
    localStorage.setItem('themeColor', color);

    alert("Theme color applied successfully!");
}

// Load the saved theme color from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
    let savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
        document.getElementById('theme-color').value = savedColor;
    }
});
