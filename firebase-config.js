
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8hyuyPY6UBX9jDSJvdT4gUMu4BrUour0",
  authDomain: "monster-quiz-6747.firebaseapp.com",
  projectId: "monster-quiz-6747",
  storageBucket: "monster-quiz-6747.firebasestorage.app",
  messagingSenderId: "375774801575",
  appId: "1:375774801575:web:84a5be98e6bf976245f582",
  measurementId: "G-THTD511G02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Google Sign-In Function
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem("loggedInUser", JSON.stringify({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }));

            alert(`Welcome ${user.displayName}!`);
            window.location.href = "index.html";  // Redirect to homepage or quiz
        })
        .catch((error) => {
            console.error(error.message);
            alert("Google Sign-In failed!");
        });
}

// ✅ Check if user is already logged in
window.onload = function () {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        alert(`Welcome back, ${user.name}!`);
        window.location.href = "index.html";
    }
};
