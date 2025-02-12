document.addEventListener("DOMContentLoaded", function () {
    /*** Utility Functions ***/
  
    // Get or create an error-message span adjacent to the input.
    function getErrorSpan(input) {
      const container = input.parentElement;
      let errorSpan = container.nextElementSibling;
      if (errorSpan && errorSpan.classList.contains("error-message")) {
        return { container, errorSpan };
      }
      return { container, errorSpan: null };
    }
  
    // Update or create an error message with the specified text and color.
    function updateErrorMessage(input, message, color) {
      const { container, errorSpan } = getErrorSpan(input);
      if (errorSpan) {
        errorSpan.style.color = color;
        errorSpan.textContent = message;
      } else {
        const span = document.createElement("span");
        span.classList.add("error-message");
        span.style.cssText = "font-size: 12px; display: block; color: " + color + ";";
        span.textContent = message;
        container.insertAdjacentElement("afterend", span);
      }
    }
  
    function showError(input, message) {
      updateErrorMessage(input, message, "red");
    }
  
    function showSuccess(input) {
      updateErrorMessage(input, "", "green");
    }
  
    // Remove all error messages.
    function clearErrors() {
      document.querySelectorAll(".error-message").forEach((span) => span.remove());
    }
  
    /*** Validation Icon Handling ***/
  
    // Attach error and success icons to an input (except for counselling).
    function addValidationIcons(input) {
      // Skip counselling field entirely.
      if (input.name === "counselling") return;
  
      const parent = input.parentElement;
      if (getComputedStyle(parent).position === "static") {
        parent.style.position = "relative";
      }
  
      // Create error icon.
      const errorIcon = document.createElement("img");
      errorIcon.src = "https://img.icons8.com/ios/452/info--v1.png";
      errorIcon.classList.add("validation-icon", "error-icon");
      Object.assign(errorIcon.style, {
        position: "absolute",
        right: "8px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "20px",
        height: "20px",
        display: "none",
        zIndex: "2",
        backgroundColor: "white",
        borderRadius: "50%",
        padding: "2px",
      });
  
      // Create success icon.
      const successIcon = document.createElement("span");
      successIcon.textContent = "✅";
      successIcon.classList.add("validation-icon", "success-icon");
      Object.assign(successIcon.style, {
        position: "absolute",
        right: "8px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "20px",
        height: "20px",
        display: "none",
        zIndex: "2",
        backgroundColor: "white",
        borderRadius: "50%",
        padding: "2px",
        textAlign: "center",
        lineHeight: "20px",
      });
  
      parent.appendChild(errorIcon);
      parent.appendChild(successIcon);
  
      // Toggle icons based on validation.
      function toggleValidationIcons() {
        const isValid = validateSingleInput(input);
        errorIcon.style.display = "none";
        successIcon.style.display = "none";
        if (isValid) {
          successIcon.style.display = "block";
        } else {
          errorIcon.style.display = "block";
        }
      }
  
      // Use "change" for file and checkbox/radio; "input" for others.
      if (input.type === "file" || input.type === "checkbox" || input.type === "radio") {
        input.addEventListener("change", toggleValidationIcons);
      } else {
        input.addEventListener("input", toggleValidationIcons);
      }
  
      // Add padding so icons don't overlap the input text.
      input.style.paddingRight = "35px";
    }
  
    // Attach icons to all inputs (except counselling).
    document.querySelectorAll("input, textarea, select").forEach((input) => {
      addValidationIcons(input);
    });
  
    /*** Character Counter for Inputs with maxlength ***/
  
    document.querySelectorAll("input[maxlength], textarea[maxlength]").forEach((input) => {
      if (input.name === "state") return;
      const counter = document.createElement("div");
      counter.classList.add("char-counter");
      counter.style.cssText = "font-size: 12px; margin-top: 2px;";
      input.parentElement.insertAdjacentElement("afterend", counter);
  
      const max = parseInt(input.getAttribute("maxlength"), 10);
      const updateCounter = (length) => {
        counter.textContent = `${length}/${max}`;
        counter.style.color = length >= max ? "red" : "green";
      };
  
      updateCounter(input.value.length);
      input.addEventListener("input", function () {
        updateCounter(this.value.length);
      });
    });
  
    /*** Popup Functions ***/
  
    function showPopup() {
      const popup = document.getElementById("submissionPopup");
      popup.classList.add("show");
      setTimeout(hidePopup, 3000);
    }
  
    function hidePopup() {
      document.getElementById("submissionPopup").classList.remove("show");
    }
  
    /*** Form Validation Functions ***/
  
    // Validate the entire form on submit.
    function validateForm() {
      let isValid = true;
      // Exclude counselling since one option is always selected.
      const fields = [
        { name: "full_name", message: "❌ Full name is required with max length 50.", maxLength: 50 },
        { name: "email", message: "❌ Enter a valid email address.", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        { name: "phone", message: "❌ Enter a valid 10-digit phone number.", pattern: /^\d{10}$/ },
        { name: "dob", message: "❌ Date of birth is required." },
        { name: "gender", message: "❌ Please select your gender." },
        {
          name: "city",
          message: "❌ City must be a valid name (letters only) and max 50 characters.",
          maxLength: 50,
          pattern: /^[A-Za-z\s]+$/,
        },
        { name: "state", message: "❌ Please select your state." },
        {
          name: "country",
          message: "❌ Country must be a valid name (letters only) and max 50 characters.",
          maxLength: 50,
          pattern: /^[A-Za-z\s]+$/,
        },
        { name: "address", message: "❌ Address must be 200 characters or less.", maxLength: 200 },
        { name: "message", message: "❌ Message must be 500 characters or less.", maxLength: 500 },
      ];
  
      fields.forEach((field) => {
        const input = document.querySelector(`[name='${field.name}']`);
        if (input && !validateSingleInput(input)) {
          isValid = false;
        }
      });
  
      // Special validation for the resume file input.
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
  
      // Special validation for the terms checkbox.
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
  
    // Validate a single input field.
    function validateSingleInput(input) {
      // Skip counselling field.
      if (input.name === "counselling") {
        return true;
      }
  
      // Date of Birth
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
        const cutoffDate = new Date(2010, 0, 1);
        const today = new Date();
        const fiftyYearsAgo = new Date(
          today.getFullYear() - 50,
          today.getMonth(),
          today.getDate()
        );
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
  
      // Select elements.
      if (input.tagName.toLowerCase() === "select") {
        if (!input.value || input.value === "") {
          showError(input, `Please select your ${input.name}.`);
          return false;
        } else {
          showSuccess(input);
          return true;
        }
      }
  
      // File inputs.
      if (input.type === "file") {
        if (input.name === "resume") {
          if (input.files.length === 0) {
            showError(input, "Please upload your CV/Resume.");
            return false;
          }
          const allowedExtensions = ["pdf", "doc", "docx"];
          const fileExtension = input.files[0].name.split(".").pop().toLowerCase();
          if (!allowedExtensions.includes(fileExtension)) {
            showError(input, "Only PDF, DOC, and DOCX files are allowed.");
            return false;
          }
          showSuccess(input);
          return true;
        }
        return true;
      }
  
      // Checkbox – handle terms specifically.
      if (input.type === "checkbox") {
        if (input.name === "terms") {
          if (!input.checked) {
            showError(input, "You must agree to the terms and conditions.");
            return false;
          } else {
            showSuccess(input);
            return true;
          }
        }
        return true;
      }
  
      // Standard text-like validations.
      const rules = {
        full_name: {
          message: "❌ Full name is required with max length 50.",
          maxLength: 50,
        },
        email: {
          message: "❌ Enter a valid email address.",
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        phone: {
          message: "❌ Enter a valid 10-digit phone number.",
          pattern: /^\d{10}$/,
        },
        city: {
          message:
            "❌ City must be a valid name (letters only) and max 50 characters.",
          maxLength: 50,
          pattern: /^[A-Za-z\s]+$/,
        },
        country: {
          message:
            "❌ Country must be a valid name (letters only) and max 50 characters.",
          maxLength: 50,
          pattern: /^[A-Za-z\s]+$/,
        },
        address: {
          message: "❌ Address must be 200 characters or less.",
          maxLength: 200,
        },
        message: {
          message: "❌ Message must be 500 characters or less.",
          maxLength: 500,
        },
      };
  
      const rule = rules[input.name];
      if (rule) {
        const value = input.value.trim();
        if (
          !value ||
          (rule.pattern && !rule.pattern.test(value)) ||
          (rule.maxLength && value.length > rule.maxLength)
        ) {
          showError(input, rule.message);
          return false;
        } else {
          showSuccess(input);
          return true;
        }
      }
      // If no rule applies, assume valid.
      return true;
    }
  
    // Attach instant validation on events.
    document.querySelectorAll("input, textarea, select").forEach((input) => {
      if (input.type === "file" || input.type === "checkbox" || input.type === "radio") {
        input.addEventListener("change", function () {
          validateSingleInput(input);
        });
      } else {
        input.addEventListener("input", function () {
          validateSingleInput(input);
        });
      }
    });
  
    /*** Form Submission ***/
  
    const form = document.getElementById("contactForm");
    if (form) {
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
    }
  
    /*** Additional Styles ***/
  
    const style = document.createElement("style");
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
  });
  