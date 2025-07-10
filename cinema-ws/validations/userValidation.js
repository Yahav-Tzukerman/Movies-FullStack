// validations/userValidation.js

// Regexes:
const NAME_REGEX = /^[A-Za-z\u0590-\u05FF]{2,30}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_.-]{3,20}$/;
const PASSWORD_REGEX = /^.{6,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUserData({ firstName, lastName, userName, sessionTimeOut }) {
  const errors = [];
  if (!firstName || !NAME_REGEX.test(firstName)) {
    errors.push("Invalid first name (letters only, 2-30 chars)");
  }
  if (!lastName || !NAME_REGEX.test(lastName)) {
    errors.push("Invalid last name (letters only, 2-30 chars)");
  }
  if (!userName || !USERNAME_REGEX.test(userName)) {
    errors.push("Invalid username (3-20 chars, letters, numbers, _, ., -)");
  }
  if (
    sessionTimeOut === undefined ||
    isNaN(sessionTimeOut) ||
    sessionTimeOut < 1 ||
    sessionTimeOut > 1440
  ) {
    errors.push("Invalid sessionTimeOut (1-1440 minutes required)");
  }
  return errors;
}

function validatePassword(password) {
  if (!password || !PASSWORD_REGEX.test(password)) {
    return ["Password must be at least 6 characters"];
  }
  return [];
}

function validateEmail(email) {
  if (!email || !EMAIL_REGEX.test(email)) {
    return ["Invalid email format"];
  }
  return [];
}

module.exports = {
  validateUserData,
  validatePassword,
  validateEmail,
  NAME_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  EMAIL_REGEX,
};
