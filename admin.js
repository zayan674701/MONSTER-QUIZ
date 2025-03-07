// Check for Admin Access on Load
window.onload = function () {
    let user = JSON.parse(localStorage.getItem("adminUser"));
    if (!user || !isAdmin(user.email)) {
        alert("You must be logged in as an admin.");
        window.location.href = "login.html"; // Redirect to login
    }

    loadQuizzes();
    loadVisitorStats();
};

// Check if the user is an admin
function isAdmin(email) {
    const adminEmails = ['admin@example.com']; // List of admin emails
    return adminEmails.includes(email);
}

// Load Existing Quizzes
function loadQuizzes() {
    db.collection('quizzes').get().then((querySnapshot) => {
        const quizList = document.getElementById('quiz-list-ul');
        quizList.innerHTML = ''; // Clear current list

        querySnapshot.forEach((doc) => {
            const quiz = doc.data();
            const li = document.createElement('li');
            li.textContent = `${quiz.title}`;

            // Add Edit and Delete Buttons
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = function () {
                editQuiz(doc.id, quiz); // Pass quiz ID and data
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                deleteQuiz(doc.id); // Pass quiz ID for deletion
            };

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            quizList.appendChild(li);
        });
    });
}

// Add Quiz
function addQuiz() {
    const title = document.getElementById('quiz-title').value;
    const questions = JSON.parse(document.getElementById('quiz-questions').value);

    if (title && questions) {
        db.collection('quizzes').add({
            title: title,
            questions: questions
        }).then(() => {
            alert("Quiz added successfully!");
            loadQuizzes();
        }).catch((error) => {
            alert("Error adding quiz: " + error.message);
        });
    } else {
        alert("Please enter a title and valid questions.");
    }
}

// Edit Quiz
function editQuiz(quizId, quizData) {
    document.getElementById('quiz-title').value = quizData.title;
    document.getElementById('quiz-questions').value = JSON.stringify(quizData.questions);

    // Change button action to update quiz
    const submitButton = document.getElementById('submit-quiz');
    submitButton.textContent = 'Update Quiz';
    submitButton.onclick = function (event) {
        event.preventDefault();
        updateQuiz(quizId);
    };
}

// Update Quiz
function updateQuiz(quizId) {
    const title = document.getElementById('quiz-title').value;
    const questions = JSON.parse(document.getElementById('quiz-questions').value);

    db.collection('quizzes').doc(quizId).update({
        title: title,
        questions: questions
    }).then(() => {
        alert("Quiz updated successfully!");
        loadQuizzes();
        resetForm();
    }).catch((error) => {
        alert("Error updating quiz: " + error.message);
    });
}

// Delete Quiz
function deleteQuiz(quizId) {
    const confirmDelete = confirm("Are you sure you want to delete this quiz?");
    if (confirmDelete) {
        db.collection('quizzes').doc(quizId).delete().then(() => {
            alert("Quiz deleted successfully!");
            loadQuizzes();
        }).catch((error) => {
            alert("Error deleting quiz: " + error.message);
        });
    }
}

// Reset Form After Editing
function resetForm() {
    document.getElementById('quiz-title').value = '';
    document.getElementById('quiz-questions').value = '';
    const submitButton = document.getElementById('submit-quiz');
    submitButton.textContent = 'Create Quiz';
    submitButton.onclick = function (event) {
        event.preventDefault();
        addQuiz();
    };
}

// Track Visitors
function trackVisitor() {
    db.collection('siteStats').doc('visitorCount').set({
        count: firebase.firestore.FieldValue.increment(1)
    }, { merge: true });

    const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : "guest";
    db.collection('siteStats').doc('uniqueVisitors').set({
        [userId]: true
    }, { merge: true });

    analytics.logEvent('page_view'); // Log a page view
}

// Load Visitor Stats
function loadVisitorStats() {
    db.collection('siteStats').doc('visitorCount').get().then((doc) => {
        if (doc.exists) {
            const totalVisitors = doc.data().count;
            document.getElementById('total-visits').textContent = totalVisitors;
        }
    });

    db.collection('siteStats').doc('uniqueVisitors').get().then((doc) => {
        if (doc.exists) {
            const uniqueVisitors = Object.keys(doc.data()).length;
            document.getElementById('unique-visits').textContent = uniqueVisitors;
        }
    });
}

trackVisitor(); // Track visitor on page load


// Check for Admin Access
window.onload = function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || !isAdmin(user.email)) {
        alert("You are not authorized to access the Admin Panel.");
        window.location.href = "login.html"; // Redirect to login
    }

    // If the user is an admin, load quizzes, stats, etc.
    loadQuizzes();
    loadVisitorStats();
};

// Check if the user is an admin (by email)
function isAdmin(email) {
    const adminEmails = ['zayan.sh6747@gmail.com']; // List of admin emails
    return adminEmails.includes(email);
}

// Load the user info on Admin Panel
window.onload = function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-logo').src = user.photo || 'default-logo.png';
    } else {
        alert("You must log in first.");
        window.location.href = "login.html";
    }
};
