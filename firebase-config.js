// ✅ Import Firebase (Only for ES Modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// ✅ Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyC8hyuyPY6UBX9jDSJvdT4gUMu4BrUour0",
    authDomain: "monster-quiz-6747.firebaseapp.com",
    projectId: "monster-quiz-6747",
    storageBucket: "monster-quiz-6747.appspot.com",
    messagingSenderId: "375774801575",
    appId: "1:375774801575:web:84a5be98e6bf976245f582",
    measurementId: "G-THTD511G02"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Google Sign-In Function
export function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem("loggedInUser", JSON.stringify({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }));

            alert(`Welcome ${user.displayName}!`);
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Google Sign-In Error:", error.message);
            alert("Google Sign-In failed!");
        });
}
