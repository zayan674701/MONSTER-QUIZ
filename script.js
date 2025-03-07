// Show quiz creation form
function showCreateQuiz() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("create-quiz").classList.remove("hidden");
}

// Add a new question dynamically to the quiz
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

// Save the quiz to localStorage
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

// Check if the user is logged in
function isUserLoggedIn() {
    return localStorage.getItem("loggedInUser") !== null;
}

// Load the quiz data from localStorage
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

    // Display questions one at a time
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

    // Check if the selected answer is correct
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

// Restart the quiz
function restartQuiz() {
    location.href = "index.html";
}

// Go back to the home page
function goHome() {
    document.getElementById("home").classList.remove("hidden");
    document.getElementById("create-quiz").classList.add("hidden");
    document.getElementById("quiz-container").classList.add("hidden");
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("You have logged out.");
    window.location.href = "index.html";
}

// Toggle the navigation menu
function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.classList.toggle("active");
}

// Handle Google SignIn and SignOut buttons
document.addEventListener("DOMContentLoaded", () => {
    const googleBtn = document.querySelector(".google-btn");
    if (googleBtn) {
        googleBtn.addEventListener("click", signInWithGoogle);
    }

    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", signOutUser);
    }
});

// Preview uploaded logo image
function previewLogo(event) {
    const logoPreview = document.getElementById('logo-preview');
    const logoImage = document.getElementById('logo-image');
    const userLogo = document.getElementById('user-logo');
    
    // Show the uploaded image as a preview
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            logoImage.src = reader.result;
            userLogo.src = reader.result; // Display user logo in profile section
        };
        reader.readAsDataURL(file);
    }
}

// Check if the user is logged in to allow rating and comment
window.onload = function() {
    if (isUserLoggedIn()) {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        document.getElementById("welcome-message").innerText = `Welcome, ${user.name}! Please leave your rating and comment below.`;
        document.querySelector(".rating-section").style.display = "block";
        document.querySelector(".comment-section").style.display = "block";
    } else {
        document.getElementById("welcome-message").innerText = "You need to be logged in to rate and comment.";
        document.getElementById("error-message").innerText = "Please log in first.";
    }
}

// Submit rating and comment
function submitCommentAndRating() {
    if (!isUserLoggedIn()) {
        document.getElementById("error-message").innerText = "You need to be logged in to submit a rating and comment.";
        return;
    }

    // Get comment and rating values
    const rating = document.querySelector('input[name="rating"]:checked');
    const comment = document.getElementById("comment").value;

    if (!rating || comment.trim() === "") {
        document.getElementById("error-message").innerText = "Please provide a rating and comment.";
        return;
    }

    // Get the rating value
    const ratingValue = rating.value;

    // Here you would typically send the rating and comment data to your server
    // For now, we'll just log them
    console.log("Rating:", ratingValue);
    console.log("Comment:", comment);

    alert("Your comment and rating have been submitted!");

    // Clear the form
    document.querySelector('input[name="rating"]:checked').checked = false;
    document.getElementById("comment").value = "";
}
