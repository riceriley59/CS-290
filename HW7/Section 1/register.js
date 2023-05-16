//Riley Rice
//CS 290 Section# 001
//5/15/2023

//This function performs all the validation of the inputs for the form
function checkForm() {
   // Get form elements
   const fullNameInput = document.getElementById("fullName");
   const emailInput = document.getElementById("email");
   const passwordInput = document.getElementById("password");
   const passwordConfirmInput = document.getElementById("passwordConfirm");
   const formErrors = document.getElementById("formErrors");

   // Hide form errors and remove error class from inputs
   formErrors.classList.add("hide");
   fullNameInput.classList.remove("error");
   emailInput.classList.remove("error");
   passwordInput.classList.remove("error");
   passwordConfirmInput.classList.remove("error");

   // Initialize error messages
   let errors = [];

   // Validate full name
   if (fullNameInput.value.trim().length < 1) {
      errors.push("Missing full name.");
      fullNameInput.classList.add("error");
   }

   // Validate email
   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
   if (!emailRegex.test(emailInput.value.trim())) {
      errors.push("Invalid or missing email address.");
      emailInput.classList.add("error");
   }

   // Validate password length
   if (passwordInput.value.length < 10 || passwordInput.value.length > 20) {
      errors.push("Password must be between 10 and 20 characters.");
      passwordInput.classList.add("error");
   }

   // Validate password lowercase character
   const passwordLowerRegex = /[a-z]/;
   if (!passwordLowerRegex.test(passwordInput.value)) {
      errors.push("Password must contain at least one lowercase character.");
      passwordInput.classList.add("error");
   }

   // Validate password uppercase character
   const passwordUpperRegex = /[A-Z]/;
   if (!passwordUpperRegex.test(passwordInput.value)) {
      errors.push("Password must contain at least one uppercase character.");
      passwordInput.classList.add("error");
   }

   // Validate password digit
   const passwordDigitRegex = /\d/;
   if (!passwordDigitRegex.test(passwordInput.value)) {
      errors.push("Password must contain at least one digit.");
      passwordInput.classList.add("error");
   }

   // Validate password confirmation
   if (passwordInput.value !== passwordConfirmInput.value) {
      errors.push("Password and confirmation password don't match.");
      passwordConfirmInput.classList.add("error");
   }

   // Display errors if any
   if (errors.length > 0) {
      formErrors.classList.remove("hide");
      const errorsList = document.createElement("ul");
      errors.forEach((error) => {
         const errorItem = document.createElement("li");
         errorItem.textContent = error;
         errorsList.appendChild(errorItem);
      });
      formErrors.innerHTML = "";
      formErrors.appendChild(errorsList);
  }
}

//this gets the submit button and calls check form when it is clicked
//and alo remove it's default action so that we can add custom 
//functionality to the button
document.getElementById("submit").addEventListener("click", function(event) {
   checkForm();

   // Prevent default form action. DO NOT REMOVE THIS LINE
   event.preventDefault();
});