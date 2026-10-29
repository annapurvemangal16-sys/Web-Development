
"use strict";

// ---------- DOM elements ----------
const contactForm = document.getElementById("contactForm");
const formAlert = document.getElementById("formAlert");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");

const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    subject: document.getElementById("subject"),
    message: messageInput
};

// ---------- Error handling ----------
function showFieldError(fieldName, message) {
    const field = fields[fieldName];
    const errorElement = document.getElementById(`${fieldName}Error`);

    errorElement.textContent = message;
    field.setAttribute("aria-invalid", "true");
}

function clearFieldError(fieldName) {
    const field = fields[fieldName];
    const errorElement = document.getElementById(`${fieldName}Error`);

    errorElement.textContent = "";
    field.removeAttribute("aria-invalid");
}

function showAlert(message, type) {
    formAlert.textContent = message;
    formAlert.className = `form-alert ${type}`;
    formAlert.hidden = false;
}

function hideAlert() {
    formAlert.textContent = "";
    formAlert.hidden = true;
    formAlert.className = "form-alert";
}

// ---------- Form validation ----------
function validateForm() {
    let isValid = true;

    // Clear previous validation errors.
    Object.keys(fields).forEach(clearFieldError);
    hideAlert();

    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const subject = fields.subject.value.trim();
    const message = fields.message.value.trim();

    // Validate name.
    if (name.length < 2) {
        showFieldError(
            "name",
            "Please enter a name with at least 2 characters."
        );
        isValid = false;
    } else if (name.length > 80) {
        showFieldError("name", "Name cannot exceed 80 characters.");
        isValid = false;
    }

    // Validate email.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        showFieldError("email", "Email address is required.");
        isValid = false;
    } else if (email.length > 254 || !emailPattern.test(email)) {
        showFieldError(
            "email",
            "Please enter a valid email address."
        );
        isValid = false;
    }

    // Validate subject.
    if (!subject) {
        showFieldError("subject", "Please enter a subject.");
        isValid = false;
    } else if (subject.length > 120) {
        showFieldError(
            "subject",
            "Subject cannot exceed 120 characters."
        );
        isValid = false;
    }

    // Validate message.
    if (message.length < 10) {
        showFieldError(
            "message",
            "Message must be at least 10 characters."
        );
        isValid = false;
    } else if (message.length > 1000) {
        showFieldError(
            "message",
            "Message cannot exceed 1000 characters."
        );
        isValid = false;
    }

    if (!isValid) {
        const firstInvalidField = contactForm.querySelector(
            '[aria-invalid="true"]'
        );

        showAlert(
            "Please correct the highlighted fields and try again.",
            "error"
        );

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

        return false;
    }

    return true;
}

// ---------- Form submission ----------
function validateAndSubmitForm(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    /*
     * Frontend demo only:
     * No backend or email service is connected.
     * Connect an API before claiming a message was sent.
     */
    showAlert(
        "Validation successful! Your details are ready. " +
        "Connect a backend to send this message.",
        "success"
    );

    // Keep the form data visible for demonstration.
}

contactForm.addEventListener("submit", validateAndSubmitForm);

// ---------- Clear errors while typing ----------
Object.entries(fields).forEach(([fieldName, field]) => {
    field.addEventListener("input", () => {
        clearFieldError(fieldName);

        if (!formAlert.hidden && formAlert.classList.contains("error")) {
            hideAlert();
        }
    });
});

// ---------- Message character counter ----------
function updateCharacterCount() {
    charCount.textContent = `${messageInput.value.length} / 1000`;
}

messageInput.addEventListener("input", updateCharacterCount);
updateCharacterCount();

// ---------- Dark mode ----------
function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);

    themeIcon.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

function toggleDarkMode() {
    const isDark = !document.body.classList.contains("dark-mode");

    applyTheme(isDark);

    try {
        localStorage.setItem("darkMode", String(isDark));
    } catch (error) {
        // Theme still works if browser storage is unavailable.
    }
}

function loadSavedTheme() {
    try {
        const savedTheme = localStorage.getItem("darkMode");

        if (savedTheme === "true" || savedTheme === "false") {
            applyTheme(savedTheme === "true");
            return;
        }
    } catch (error) {
        // Use the default light theme if storage is unavailable.
    }

    applyTheme(false);
}

themeToggle.addEventListener("click", toggleDarkMode);
loadSavedTheme();

// ---------- Footer year ----------
document.getElementById("currentYear").textContent =
    new Date().getFullYear();
