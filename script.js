function showCreateQuiz() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("create-quiz").classList.remove("hidden");
}

function addQuestion() {
    let container = document.getElementById("questions-container");
    
    let div = document.createElement("div");
    div.className = "question-box";
    div.innerHTML = `
        <input type="text" placeholder="Enter Question" class="question">
        <input type="file" class="image-upload">
        <div>
            <input type="text" placeholder="Option 1" class="option"> 
            <input type="text" placeholder="Option 2" class="option">
            <input type="text" placeholder="Option 3" class="option">
            <input type="text" placeholder="Option 4" class="option">
        </div>
        <label>Correct Answer: </label>
        <select class="answer">
            <option value="0">Option 1</option>
            <option value="1">Option 2</option>
            <option value="2">Option 3</option>
            <option value="3">Option 4</option>
        </select>
    `;
    container.appendChild(div);
}

function saveQuiz() {
    if (!isUserLoggedIn()) {
        alert("Please log in to create a quiz.");
        window.location.href = "login.html";
        return;
    }

    let questions = [];
    document.querySelectorAll(".question-box").forEach((box) => {
        let question = box.querySelector(".question").value;
        let options = Array.from(box.querySelectorAll(".option")).map(opt => opt.value);
        let answer = parseInt(box.querySelector(".answer").value);
        let imageFile = box.querySelector(".image-upload").files[0];

        let imageData = imageFile ? URL.createObjectURL(imageFile) : null;

        if (question && options.every(opt => opt)) {
            questions.push({ question, options, answer, image: imageData });
        }
    });

    if (questions.length === 0) {
        alert("Please add at least one valid question.");
        return;
    }

    let quizId = Date.now().toString();
    localStorage.setItem(quizId, JSON.stringify(questions));

    let quizLink = `${window.location.href}?quiz=${quizId}`;
    prompt("Copy this link and share it:", quizLink);
}

function isUserLoggedIn() {
    return localStorage.getItem("loggedInUser") !== null;
}

function loadQuiz(quizId) {
    let quizData = JSON.parse(localStorage.getItem(quizId));
    if (!quizData) {
        alert("Quiz not found!");
        return;
    }

    document.getElementById("home").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");

    let quizContent = document.getElementById("quiz-content");
    quizContent.innerHTML = "";
    let currentQuestionIndex = 0;

    function showQuestion(index) {
        let q = quizData[index];
        quizContent.innerHTML = `
            <div class="question-box">
                <p><b>${q.question}</b></p>
                ${q.image ? `<img src="${q.image}" alt="Question Image">` : ""}
                ${q.options.map((opt, i) => `
                    <button class="quiz-option" onclick="checkAnswer(${i}, ${q.answer}, ${index})">${opt}</button>
                `).join("")}
            </div>
        `;
    }

    window.checkAnswer = function(selected, correct, index) {
        let options = document.querySelectorAll(".quiz-option");
        options.forEach((btn, i) => {
            btn.disabled = true;
            if (i === correct) {
                btn.classList.add("correct");
            } else if (i === selected) {
                btn.classList.add("wrong");
            }
        });

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                showQuestion(currentQuestionIndex);
            } else {
                document.getElementById("score-display").innerText = "Quiz Completed!";
            }
        }, 1000);
    };

    showQuestion(currentQuestionIndex);
}

function restartQuiz() {
    location.href = "index.html";
}

function goHome() {
    document.getElementById("home").classList.remove("hidden");
    document.getElementById("create-quiz").classList.add("hidden");
    document.getElementById("quiz-container").classList.add("hidden");
}

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("You have logged out.");
    window.location.href = "index.html";
}

window.onload = () => {
    let params = new URLSearchParams(window.location.search);
    if (params.has("quiz")) {
        loadQuiz(params.get("quiz"));
    }
};
function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("active");
}

function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.classList.toggle("active");
}


// ✅ Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8hyuyPY6UBX9jDSJvdT4gUMu4BrUour0",
    authDomain: "monster-quiz-6747.firebaseapp.com",
    projectId: "monster-quiz-6747",
    storageBucket: "monster-quiz-6747.firebasestorage.app",
    messagingSenderId: "375774801575",
    appId: "1:375774801575:web:84a5be98e6bf976245f582"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

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
