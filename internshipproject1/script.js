
const form = document.getElementById("contactForm");
const feedback = document.getElementById("feedback");

// Display error message
function showError(message) {
    feedback.textContent = message;
    feedback.className = "error";
}

// Display success message
function showSuccess(message) {
    feedback.textContent = message;
    feedback.className = "success";
}

// Form validation
function validateForm(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showError("Please enter a valid email address");
        return false;
    }

    if (message.length < 10) {
        showError("Message must be at least 10 characters");
        return false;
    }

    showSuccess("Form validated successfully!");
    form.reset();
    return true;
}

// Form submit event
form.addEventListener("submit", validateForm);

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("darkMode", String(isDark));
}

// Restore saved theme
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}
