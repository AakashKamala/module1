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
