// regexValidations.js

// Regular expression for validating email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular expression for validating password
// Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Regular expression for validating username
// Username must be alphanumeric and between 3 to 16 characters long
const usernameRegex = /^[a-zA-Z0-9]{3,16}$/;

// Regular expression for validating name
// Name must be at least 2 characters long
const nameRegex = /^[a-zA-Z]{2,}$/;

// Function to validate email
const validateEmail = (email) => {
  return emailRegex.test(email);
};

// Function to validate password
const validatePassword = (password) => {
  return passwordRegex.test(password);
};

// Function to validate username
const validateUsername = (username) => {
  return usernameRegex.test(username);
};

// Function to validate name
const validateName = (name) => {
  return nameRegex.test(name);
};

const validateFiled = (field, value) => {
  switch (field) {
    case "email":
      return validateEmail(value);
    case "password":
      return validatePassword(value);
    case "username":
      return validateUsername(value);
    case "name":
      return validateName(value);
    default:
      return false;
  }
};

export { validateEmail, validatePassword, validateUsername, validateName, validateFiled };
