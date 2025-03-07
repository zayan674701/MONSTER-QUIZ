// Initialize Firebase
const auth = firebase.auth();

// Log out the user
function logOut() {
    auth.signOut().then(() => {
        localStorage.removeItem("loggedInUser"); // Remove user data from localStorage
        window.location.href = "login.html"; // Redirect to the login page
    }).catch((error) => {
        console.error("Sign out error:", error.message);
    });
}

// Attach to the logout button (example: in admin.html)
document.getElementById("logout-btn").addEventListener("click", logOut);

