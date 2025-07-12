// validations/userValidation.js

const NAME_REGEX = /^[A-Za-z\u0590-\u05FF]{2,30}$/; // Hebrew and English letters, 2-30 chars
const USERNAME_REGEX = /^[a-zA-Z0-9_.-]{3,20}$/; // 3-20 chars, letters, numbers, _, ., -
const PASSWORD_REGEX = /^.{6,}$/; // At least 6 characters
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
const PERMISSIONS = [
  "View Subscriptions",
  "Create Subscriptions",
  "Update Subscriptions",
  "Delete Subscriptions",
  "View Movies",
  "Create Movies",
  "Update Movies",
  "Delete Movies",
  "View Users",
  "Create Users",
  "Update Users",
  "Delete Users",
];

function validateUserData({ firstName, lastName, sessionTimeOut }) {
  const errors = [];
  if (!firstName || !NAME_REGEX.test(firstName)) {
    errors.push(
      "Invalid first name: letters only, 2-30 chars (Hebrew/English)"
    );
  }
  if (!lastName || !NAME_REGEX.test(lastName)) {
    errors.push("Invalid last name: letters only, 2-30 chars (Hebrew/English)");
  }
  if (
    sessionTimeOut === undefined ||
    isNaN(sessionTimeOut) ||
    sessionTimeOut < 1 ||
    sessionTimeOut > 1440
  ) {
    errors.push("Invalid sessionTimeOut: must be 1-1440 minutes");
  }
  return errors;
}

function validateUserName(userName) {
  if (!userName || !USERNAME_REGEX.test(userName)) {
    return ["Invalid username: 3-20 chars, letters, numbers, _, ., -"];
  }
  return [];
}

function validatePassword(password) {
  if (!password || !PASSWORD_REGEX.test(password)) {
    return ["Password must be at least 6 characters"];
  }
  return [];
}

function validatePermissions(permissions) {
  if (!Array.isArray(permissions) || permissions.length === 0) {
    return ["At least one permission is required"];
  }
  const invalid = permissions.filter((p) => !PERMISSIONS.includes(p));
  if (invalid.length > 0) {
    return [`Invalid permissions: ${invalid.join(", ")}`];
  }
  return [];
}

function validateUserFull(input) {
  // input: { firstName, lastName, sessionTimeOut, userName, password, permissions }
  let errors = [];
  errors.push(...validateUserData(input));
  errors.push(...validateUserName(input.userName));
  if ("password" in input) errors.push(...validatePassword(input.password));
  if ("permissions" in input)
    errors.push(...validatePermissions(input.permissions));
  return errors.filter(Boolean);
}

module.exports = {
  validateUserData,
  validateUserName,
  validatePassword,
  validatePermissions,
  validateUserFull,
  NAME_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  EMAIL_REGEX,
  PERMISSIONS,
};
