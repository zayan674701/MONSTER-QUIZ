// ✅ Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const adminEmail = "admin@example.com";  // Replace with your admin email

// ✅ Check Admin Access
auth.onAuthStateChanged(user => {
    if (user) {
        if (user.email === adminEmail) {
            loadUsers();
        } else {
            alert("Access Denied! You are not an Admin.");
            window.location.href = "index.html";
        }
    } else {
        window.location.href = "login.html";
    }
});

// ✅ Load Users Data
function loadUsers() {
    db.collection("users").onSnapshot(snapshot => {
        let usersTable = document.getElementById("usersTable");
        usersTable.innerHTML = "";
        let totalUsers = snapshot.size;

        document.getElementById("totalUsers").textContent = totalUsers;

        snapshot.forEach(doc => {
            let user = doc.data();
            let row = `<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${new Date(user.createdAt.toDate()).toLocaleString()}</td>
            </tr>`;
            usersTable.innerHTML += row;
        });
    });
}

// ✅ Logout Admin
function logout() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    });
}
