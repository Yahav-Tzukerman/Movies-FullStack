const NAME_REGEX = /^[A-Za-z\u0590-\u05FF]{2,30}$/; // אותיות בלבד (עברית/אנגלית), 2-30 תווים
const USERNAME_REGEX = /^[a-zA-Z0-9_.-]{3,20}$/; // 3-20 אותיות/מספרים/נקודה/מקף
const PASSWORD_REGEX = /^.{6,}$/; // מינימום 6 תווים

export const PERMISSIONS = [
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

export function validateUserData({ firstName, lastName, sessionTimeOut }) {
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

export function validateUserName(userName) {
  if (!userName || !USERNAME_REGEX.test(userName)) {
    return ["Invalid username: 3-20 chars, letters, numbers, _, ., -"];
  }
  return [];
}

export function validatePermissions(permissions) {
  if (!Array.isArray(permissions) || permissions.length === 0) {
    return ["At least one permission is required"];
  }
  const invalid = permissions.filter((p) => !PERMISSIONS.includes(p));
  if (invalid.length > 0) {
    return [`Invalid permissions: ${invalid.join(", ")}`];
  }
  return [];
}

export function validateUserFull(input) {
  let errors = [];
  errors.push(...validateUserData(input));
  errors.push(...validateUserName(input.userName));
  if ("permissions" in input)
    errors.push(...validatePermissions(input.permissions));
  return errors.filter(Boolean);
}
