// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Google Sign-In Function
function signInWithGoogle() {
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // Store the user data in localStorage
            localStorage.setItem("loggedInUser", JSON.stringify({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }));

            // Redirect to Admin Panel (or homepage)
            window.location.href = "admin.html"; // Adjust this as per your flow
        })
        .catch((error) => {
            console.error("Google Sign-In Error:", error.message);
            alert("Google Sign-In failed! Try again.");
        });
}

// Check if user is logged in and redirect to the correct page
window.onload = function() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        window.location.href = "admin.html"; // Redirect to Admin Panel if already logged in
    }
};
