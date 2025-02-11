document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();
        if (validateForm()) {
            alert("Form submitted successfully!");
            this.submit(); // Uncomment this line to allow actual submission
        }
    });

    // Remove error message on user input
    document.querySelectorAll("input, textarea, select").forEach(input => {
        input.addEventListener("input", function () {
            removeError(this);
        });
    });
});

function validateForm() {
    let isValid = true;
    
    const fields = [
        { name: "full_name", message: "Full name is required with max length 50.", maxLength: 50 },
        { name: "email", message: "Enter a valid email address.", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        { name: "phone", message: "Enter a valid 10-digit phone number.", pattern: /^\d{10}$/ },
        { name: "dob", message: "Date of birth is required." },
        { name: "gender", message: "Please select your gender." },
        { name: "city", message: "City must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
        { name: "state", message: "State must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
        { name: "country", message: "Country must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
        { name: "address", message: "Address must be 200 characters or less.", maxLength: 200 },
        { name: "message", message: "Message must be 500 characters or less.", maxLength: 500 },
        { name: "counselling", message: "Please select an option for counselling." }
    ];
    
    fields.forEach(field => {
        const input = document.querySelector(`[name='${field.name}']`);
        if (input) {
            if (field.pattern && !field.pattern.test(input.value.trim())) {
                showError(input, field.message);
                isValid = false;
            } else if (field.maxLength && input.value.trim().length > field.maxLength) {
                showError(input, field.message);
                isValid = false;
            } else if (!input.value.trim()) {
                showError(input, field.message);
                isValid = false;
            }
        }
    });
    
    const resume = document.querySelector("input[name='resume']");
    if (resume.files.length === 0) {
        showError(resume, "Please upload your CV/Resume.");
        isValid = false;
    } else {
        const allowedExtensions = ["pdf", "doc", "docx"];
        const fileExtension = resume.files[0].name.split(".").pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            showError(resume, "Only PDF, DOC, and DOCX files are allowed.");
            isValid = false;
        }
    }
    
    const terms = document.querySelector("input[name='terms']");
    if (!terms.checked) {
        showError(terms, "You must agree to the terms and conditions.");
        isValid = false;
    }
    
    return isValid;
}


function showError(input, message) {
    let errorSpan = input.parentElement.querySelector(".error-message");
    if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("error-message");
        errorSpan.style.color = "red";
        errorSpan.style.fontSize = "12px";
        input.parentElement.insertAdjacentElement("afterend", errorSpan);

    }
    errorSpan.textContent = message;
}

function removeError(input) {
    let errorSpan = input.parentElement.querySelector(".error-message");
    if (errorSpan) {
        errorSpan.remove();
    }
}

function clearErrors() {
    document.querySelectorAll(".error-message").forEach(errorSpan => errorSpan.remove());
}





























































document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        if (validateForm()) {
            showPopup();
            setTimeout(() => {
                this.submit();
            }, 3000);
        }
    });

    document.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", function () {
            validateField(this);
        });
    });
});

function validateForm() {
    let isValid = true;
    document.querySelectorAll("input, textarea").forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    return isValid;
}

function validateField(input) {
    let isValid = true;
    const name = input.name;
    const value = input.value.trim();
    let errorMessage = "";
    let pattern, maxLength;

    if (name === "email") {
        pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorMessage = "Enter a valid email address.";
    } else if (name === "phone") {
        pattern = /^\d{10}$/;
        errorMessage = "Enter a valid 10-digit phone number.";
    } else if (name === "dob") {
        const birthYear = new Date(value).getFullYear();
        const currentYear = new Date().getFullYear();
        if (birthYear >= 2010 || birthYear < currentYear - 50) {
            errorMessage = "Invalid Date of Birth. Must be before 2010 and not older than 50 years.";
        }
    } else if (name === "address") {
        maxLength = 50;
        updateWordCounter(input, maxLength);
    } else if (name === "message") {
        maxLength = 200;
        updateWordCounter(input, maxLength);
    }

    if (pattern && !pattern.test(value)) {
        isValid = false;
    } else if (maxLength && value.split(" ").length > maxLength) {
        isValid = false;
        errorMessage = `Max ${maxLength} words allowed.`;
    } else if (!value) {
        isValid = false;
        errorMessage = "This field is required.";
    }

    toggleError(input, isValid, errorMessage);
    return isValid;
}

function toggleError(input, isValid, message) {
    let icon = input.parentElement.querySelector(".validation-icon");
    if (!icon) {
        icon = document.createElement("span");
        icon.classList.add("validation-icon");
        input.parentElement.appendChild(icon);
    }

    if (!isValid) {
        icon.innerHTML = "❌"; // Red 'i' icon
        icon.style.color = "red";
        showError(input, message);
    } else {
        icon.innerHTML = "✅"; // Green tick icon
        icon.style.color = "green";
        removeError(input);
    }
}

function showError(input, message) {
    let errorSpan = input.parentElement.querySelector(".error-message");
    if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.classList.add("error-message");
        errorSpan.style.color = "red";
        errorSpan.style.fontSize = "12px";
        input.parentElement.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
}

function removeError(input) {
    let errorSpan = input.parentElement.querySelector(".error-message");
    if (errorSpan) errorSpan.remove();
}

function updateWordCounter(input, limit) {
    let wordCount = input.value.trim().split(/\s+/).length;
    let counter = input.parentElement.querySelector(".word-counter");
    if (!counter) {
        counter = document.createElement("span");
        counter.classList.add("word-counter");
        input.parentElement.appendChild(counter);
    }
    counter.textContent = `${wordCount}/${limit}`;
    counter.style.color = wordCount > limit ? "red" : "green";
    if (wordCount > limit) {
        input.value = input.value.split(/\s+/).slice(0, limit).join(" ");
    }
}

function clearErrors() {
    document.querySelectorAll(".error-message, .validation-icon, .word-counter").forEach(el => el.remove());
}

function showPopup() {
    const popup = document.getElementById("submissionPopup");
    popup.classList.add("show");
    setTimeout(() => { popup.classList.remove("show"); }, 3000);
}
