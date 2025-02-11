// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("contactForm").addEventListener("submit", function (event) {
//         event.preventDefault();
//         clearErrors();

//         if (validateForm()) {
//             showPopup();
//             setTimeout(() => {
//                 this.submit();
//             }, 3000);
//         }
//     });

//     document.querySelectorAll("input, textarea, select").forEach(input => {
//         input.addEventListener("input", function () {
//             removeError(this);
//         });
//     });
// });


// function showPopup() {
//     const popup = document.getElementById("submissionPopup");
//     popup.classList.add("show");

//     setTimeout(() => {
//         hidePopup();
//     }, 3000);
// }

// function hidePopup() {
//     const popup = document.getElementById("submissionPopup");
//     popup.classList.remove("show");
// }

// function validateForm() {
//     let isValid = true;
    
//     const fields = [
//         { name: "full_name", message: "Full name is required with max length 50.", maxLength: 50 },
//         { name: "email", message: "Enter a valid email address.", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
//         { name: "phone", message: "Enter a valid 10-digit phone number.", pattern: /^\d{10}$/ },
//         { name: "dob", message: "Date of birth is required." },
//         { name: "gender", message: "Please select your gender." },
//         { name: "city", message: "City must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
//         { name: "state", message: "State must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
//         { name: "country", message: "Country must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
//         { name: "address", message: "Address must be 200 characters or less.", maxLength: 200 },
//         { name: "message", message: "Message must be 500 characters or less.", maxLength: 500 },
//         { name: "counselling", message: "Please select an option for counselling." }
//     ];
    
//     fields.forEach(field => {
//         const input = document.querySelector(`[name='${field.name}']`);
//         if (input) {
//             if (field.pattern && !field.pattern.test(input.value.trim())) {
//                 showError(input, field.message);
//                 isValid = false;
//             } else if (field.maxLength && input.value.trim().length > field.maxLength) {
//                 showError(input, field.message);
//                 isValid = false;
//             } else if (!input.value.trim()) {
//                 showError(input, field.message);
//                 isValid = false;
//             }
//         }
//     });
    
//     const resume = document.querySelector("input[name='resume']");
//     if (resume.files.length === 0) {
//         showError(resume, "Please upload your CV/Resume.");
//         isValid = false;
//     } else {
//         const allowedExtensions = ["pdf", "doc", "docx"];
//         const fileExtension = resume.files[0].name.split(".").pop().toLowerCase();
//         if (!allowedExtensions.includes(fileExtension)) {
//             showError(resume, "Only PDF, DOC, and DOCX files are allowed.");
//             isValid = false;
//         }
//     }
    
//     const terms = document.querySelector("input[name='terms']");
//     if (!terms.checked) {
//         showError(terms, "You must agree to the terms and conditions.");
//         isValid = false;
//     }
    
//     return isValid;
// }


// function showError(input, message) {
//     let errorSpan = input.parentElement.querySelector(".error-message");
//     if (!errorSpan) {
//         errorSpan = document.createElement("span");
//         errorSpan.classList.add("error-message");
//         errorSpan.style.color = "red";
//         errorSpan.style.fontSize = "12px";
//         input.parentElement.insertAdjacentElement("afterend", errorSpan);

//     }
//     errorSpan.textContent = message;
// }

// function removeError(input) {
//     let errorSpan = input.parentElement.nextElementSibling;
//     if (errorSpan && errorSpan.classList.contains("error-message")) {
//         errorSpan.remove();
//     }
// }

// function clearErrors() {
//     document.querySelectorAll(".error-message").forEach(errorSpan => errorSpan.remove());
// }

































// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("contactForm");
//     form.addEventListener("submit", function (event) {
//         event.preventDefault();
//         clearErrors();

//         if (validateForm()) {
//             showPopup();
//             setTimeout(() => {
//                 form.submit();
//             }, 3000);
//         }
//     });

//     document.querySelectorAll("input, textarea, select").forEach(input => {
//         input.addEventListener("input", function () {
//             validateSingleInput(this);
//         });
//     });
// });

// function showPopup() {
//     const popup = document.getElementById("submissionPopup");
//     popup.classList.add("show");
//     setTimeout(hidePopup, 3000);
// }

// function hidePopup() {
//     document.getElementById("submissionPopup").classList.remove("show");
// }

// function validateForm() {
//     let isValid = true;

//     // List of field rules
//     const fields = [
//         { name: "full_name", message: "Full name is required with max length 50.", maxLength: 50 },
//         { name: "email", message: "Enter a valid email address.", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
//         { name: "phone", message: "Enter a valid 10-digit phone number.", pattern: /^\d{10}$/ },
//         { name: "dob", message: "Date of birth is required." },
//         { name: "gender", message: "Please select your gender." },
//         { name: "city", message: "City must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
//         { name: "state", message: "State must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
//         { name: "country", message: "Country must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
//         { name: "address", message: "Address must be 200 characters or less.", maxLength: 200 },
//         { name: "message", message: "Message must be 500 characters or less.", maxLength: 500 },
//         { name: "counselling", message: "Please select an option for counselling." }
//     ];

//     fields.forEach(field => {
//         const input = document.querySelector(`[name='${field.name}']`);
//         if (input && !validateSingleInput(input)) {
//             isValid = false;
//         }
//     });

//     // Validate resume file input
//     const resume = document.querySelector("input[name='resume']");
//     if (resume) {
//         if (resume.files.length === 0) {
//             showError(resume, "Please upload your CV/Resume.");
//             isValid = false;
//         } else {
//             const allowedExtensions = ["pdf", "doc", "docx"];
//             const fileExtension = resume.files[0].name.split(".").pop().toLowerCase();
//             if (!allowedExtensions.includes(fileExtension)) {
//                 showError(resume, "Only PDF, DOC, and DOCX files are allowed.");
//                 isValid = false;
//             } else {
//                 showSuccess(resume);
//             }
//         }
//     }

//     // Validate terms checkbox
//     const terms = document.querySelector("input[name='terms']");
//     if (terms) {
//         if (!terms.checked) {
//             showError(terms, "You must agree to the terms and conditions.");
//             isValid = false;
//         } else {
//             showSuccess(terms);
//         }
//     }

//     return isValid;
// }

// function validateSingleInput(input) {
//     const rules = {
//         "full_name": { message: "Full name is required with max length 50.", maxLength: 50 },
//         "email": { message: "Enter a valid email address.", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
//         "phone": { message: "Enter a valid 10-digit phone number.", pattern: /^\d{10}$/ },
//         "dob": { message: "Date of birth is required." },
//         "gender": { message: "Please select your gender." },
//         "city": { message: "City must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
//         "state": { message: "State must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
//         "country": { message: "Country must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
//         "address": { message: "Address must be 200 characters or less.", maxLength: 200 },
//         "message": { message: "Message must be 500 characters or less.", maxLength: 500 },
//         "counselling": { message: "Please select an option for counselling." }
//     };

//     // Files and checkboxes are handled separately
//     if (input.type === "file") {
//         return true;
//     }
//     if (input.type === "checkbox") {
//         if (!input.checked) {
//             showError(input, "You must agree to the terms and conditions.");
//             return false;
//         } else {
//             showSuccess(input);
//             return true;
//         }
//     }

//     const rule = rules[input.name];
//     if (rule) {
//         const value = input.value.trim();
//         if (!value || (rule.pattern && !rule.pattern.test(value)) || (rule.maxLength && value.length > rule.maxLength)) {
//             showError(input, rule.message);
//             return false;
//         } else {
//             showSuccess(input);
//             return true;
//         }
//     }
//     return true;
// }

// // Helper: Get or create the error span inserted after the input’s parent (the border container)
// function getErrorSpan(input) {
//     // Assume the input is inside a container (like <div class="border-b ...">)
//     let container = input.parentElement;
//     let errorSpan = container.nextElementSibling;
//     if (errorSpan && errorSpan.classList.contains("error-message")) {
//         return { container, errorSpan };
//     }
//     return { container, errorSpan: null };
// }

// function showError(input, message) {
//     const { container, errorSpan } = getErrorSpan(input);
//     if (errorSpan) {
//         // Always update the color back to red
//         errorSpan.style.color = "red";
//         errorSpan.textContent = message;
//     } else {
//         const span = document.createElement("span");
//         span.classList.add("error-message");
//         span.style.fontSize = "12px";
//         span.style.display = "block";
//         span.style.color = "red";
//         span.textContent = message;
//         container.insertAdjacentElement("afterend", span);
//     }
// }

// function showSuccess(input) {
//     const { container, errorSpan } = getErrorSpan(input);
//     if (errorSpan) {
//         errorSpan.style.color = "green";
//         errorSpan.textContent = "Correct input ✅";
//     } else {
//         const span = document.createElement("span");
//         span.classList.add("error-message");
//         span.style.fontSize = "12px";
//         span.style.display = "block";
//         span.style.color = "green";
//         span.textContent = "Correct input ✅";
//         container.insertAdjacentElement("afterend", span);
//     }
// }

// function clearErrors() {
//     document.querySelectorAll(".error-message").forEach(span => span.remove());
// }
















































document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        if (validateForm()) {
            showPopup();
            setTimeout(() => {
                form.submit();
            }, 3000);
        }
    });

    // Validate on input for all inputs, textareas, and selects.
    document.querySelectorAll("input, textarea, select").forEach(input => {
        input.addEventListener("input", function () {
            validateSingleInput(this);
        });
    });







    document.querySelectorAll("input, textarea, select").forEach(input => {
        // Ensure parent has position relative for absolute positioning of icons
        if (getComputedStyle(input.parentElement).position === 'static') {
            input.parentElement.style.position = 'relative';
        }
        
        // Create icons
        const errorIcon = document.createElement("img");
        errorIcon.src = "https://img.icons8.com/ios/452/info--v1.png";
        errorIcon.className = "validation-icon error-icon";
        
        const successIcon = document.createElement("span");
        successIcon.textContent = "✅";
        successIcon.className = "validation-icon success-icon";
        
        // Add both icons to parent
        input.parentElement.appendChild(errorIcon);
        input.parentElement.appendChild(successIcon);
        
        // Add common styles
        const commonStyles = {
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            display: 'none',
            zIndex: '2',
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '2px'
        };
        
        // Apply styles to both icons
        [errorIcon, successIcon].forEach(icon => {
            Object.assign(icon.style, commonStyles);
        });
        
        // Add input event listener
        input.addEventListener("input", function() {
            const isValid = validateSingleInput(this);
            
            // Hide both icons first
            errorIcon.style.display = 'none';
            successIcon.style.display = 'none';
            
            // Show appropriate icon based on validation
            if (isValid) {
                successIcon.style.display = 'block';
            } else {
                errorIcon.style.display = 'block';
            }
        });
        
        // Add some space for the icons
        input.style.paddingRight = '35px';
    });
    
    // Add styles to head
    const style = document.createElement('style');
    style.textContent = `
        .validation-icon {
            transition: all 0.2s ease;
        }
        .error-icon {
            filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
        }
        .success-icon {
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);









    document.querySelector("input[type='file']").addEventListener("change", function () {
        const file = this.files[0];
        if(file) {
            const allowedExtensions = ["pdf", "doc", "docx"];
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                showError(this, "Only PDF, DOC, and DOCX files are allowed.");
            } else {
                showSuccess(this);
            }
        }
    });

    // Attach character counters to all text-based inputs and textareas with a maxlength,
    // except for fields that are not meant for free text (like the State select).
    document.querySelectorAll("input[maxlength], textarea[maxlength]").forEach(input => {
        if (input.name === "state") return; // Skip the state field if present as an input.
        
        let counter = document.createElement("div");
        counter.classList.add("char-counter");
        counter.style.fontSize = "12px";
        counter.style.marginTop = "2px";
        // Insert the counter after the input's container (assumed to be the div with the border)
        input.parentElement.insertAdjacentElement("afterend", counter);

        const max = parseInt(input.getAttribute("maxlength"), 10);
        // counter.textContent = `${input.value.length}/${max}`;
        // counter.style.color = input.value.length > max ? "red" : "green";

        input.addEventListener("input", function () {
            const len = this.value.length;
            // counter.textContent = `${len}/${max}`;
            // counter.style.color = len > max ? "red" : "green";
        });
    });
});


document.querySelectorAll("input[maxlength], textarea[maxlength]").forEach(input => {
    if (input.name === "state") return; // Skip the state field if present as an input.
    
    let counter = document.createElement("div");
    counter.classList.add("char-counter");
    counter.style.fontSize = "12px";
    counter.style.marginTop = "2px";
    // Insert the counter after the input's container
    input.parentElement.insertAdjacentElement("afterend", counter);

    const max = parseInt(input.getAttribute("maxlength"), 10);
    const updateCounter = (length) => {
        counter.textContent = `${length}/${max}`;
        counter.style.color = length >= max ? "red" : "green";
    };

    // Initial update
    updateCounter(input.value.length);

    // Update on input
    input.addEventListener("input", function() {
        updateCounter(this.value.length);
    });
});

function showPopup() {
    const popup = document.getElementById("submissionPopup");
    popup.classList.add("show");
    setTimeout(hidePopup, 3000);
}

function hidePopup() {
    document.getElementById("submissionPopup").classList.remove("show");
}

function validateForm() {
    let isValid = true;
    const fields = [
        { name: "full_name", message: "❌ Full name is required with max length 50.", maxLength: 50 },
        { name: "email", message: "❌ Enter a valid email address.", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        { name: "phone", message: "❌ Enter a valid 10-digit phone number.", pattern: /^\d{10}$/ },
        { name: "dob", message: "❌ Date of birth is required." },
        { name: "gender", message: "❌ Please select your gender." },
        { name: "city", message: "❌ City must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
        // For state, since it is now a select, just ensure a value is selected.
        { name: "state", message: "❌ Please select your state." },
        { name: "country", message: "❌ Country must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
        { name: "address", message: "❌ Address must be 200 characters or less.", maxLength: 200 },
        { name: "message", message: "❌ Message must be 500 characters or less.", maxLength: 500 },
        { name: "counselling", message: "❌ Please select an option for counselling." }
    ];

    fields.forEach(field => {
        const input = document.querySelector(`[name='${field.name}']`);
        if (input && !validateSingleInput(input)) {
            isValid = false;
        }
    });

    // Validate resume file input if present
    const resume = document.querySelector("input[name='resume']");
    if (resume) {
        if (resume.files.length === 0) {
            showError(resume, "Please upload your CV/Resume.");
            isValid = false;
        } else {
            const allowedExtensions = ["pdf", "doc", "docx"];
            const fileExtension = resume.files[0].name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                showError(resume, "Only PDF, DOC, and DOCX files are allowed.");
                isValid = false;
            } else {
                showSuccess(resume);
            }
        }
    }

    // Validate terms checkbox if present
    const terms = document.querySelector("input[name='terms']");
    if (terms) {
        if (!terms.checked) {
            showError(terms, "You must agree to the terms and conditions.");
            isValid = false;
        } else {
            showSuccess(terms);
        }
    }
    return isValid;
}

function validateSingleInput(input) {
    // Special handling for Date of Birth (dob)
    if (input.name === "dob") {
        const value = input.value;
        if (!value) {
            showError(input, "Date of birth is required.");
            return false;
        }
        const dob = new Date(value);
        if (isNaN(dob.getTime())) {
            showError(input, "Enter a valid date.");
            return false;
        }
        const cutoffDate = new Date(2010, 0, 1); // Birthday must be before Jan 1, 2010
        const today = new Date();
        const fiftyYearsAgo = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());
        if (dob >= cutoffDate) {
            showError(input, "Birthday must be before 2010.");
            return false;
        }
        if (dob < fiftyYearsAgo) {
            showError(input, "Birthday must not be older than 50 years.");
            return false;
        }
        showSuccess(input);
        return true;
    }

    // Special handling for select elements (e.g. state)
    if (input.tagName.toLowerCase() === "select") {
        if (!input.value || input.value === "") {
            showError(input, `Please select your ${input.name}.`);
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }

    // Skip file and checkbox types here (handled separately)
    if (input.type === "file" || input.type === "checkbox" || input.type === "radio") {
        return true;
    }

    const rules = {
        "full_name": { message: "❌ Full name is required with max length 50.", maxLength: 50 },
        "email": { message: "❌ Enter a valid email address.", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        "phone": { message: "❌ Enter a valid 10-digit phone number.", pattern: /^\d{10}$/ },
        "city": { message: "❌ City must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
        // "state" is handled above as a select.
        "country": { message: "❌ Country must be a valid name (letters only) and max 50 characters.", maxLength: 50, pattern: /^[A-Za-z\s]+$/ },
        "address": { message: "❌ Address must be 200 characters or less.", maxLength: 200 },
        "message": { message: "❌ Message must be 500 characters or less.", maxLength: 500 },
        "counselling": { message: "❌ Please select an option for counselling." }
    };

    const rule = rules[input.name];
    if (rule) {
        const value = input.value.trim();
        if (!value || (rule.pattern && !rule.pattern.test(value)) || (rule.maxLength && value.length > rule.maxLength)) {
            showError(input, rule.message);
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }
    return true;
}

// Helper function to get or create the error message span
function getErrorSpan(input) {
    let container = input.parentElement;
    let errorSpan = container.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains("error-message")) {
        return { container, errorSpan };
    }
    return { container, errorSpan: null };
}

function showError(input, message) {
    const { container, errorSpan } = getErrorSpan(input);
    if (errorSpan) {
        errorSpan.style.color = "red";
        errorSpan.textContent = message;
    } else {
        const span = document.createElement("span");
        span.classList.add("error-message");
        span.style.fontSize = "12px";
        span.style.display = "block";
        span.style.color = "red";
        span.textContent = message;
        container.insertAdjacentElement("afterend", span);
    }
}

function showSuccess(input) {
    const { container, errorSpan } = getErrorSpan(input);
    if (errorSpan) {
        errorSpan.style.color = "green";
        errorSpan.textContent = "";
    } else {
        const span = document.createElement("span");
        span.classList.add("error-message");
        span.style.fontSize = "12px";
        span.style.display = "block";
        span.style.color = "green";
        span.textContent = "";
        container.insertAdjacentElement("afterend", span);
    }
}

function clearErrors() {
    document.querySelectorAll(".error-message").forEach(span => span.remove());
}

