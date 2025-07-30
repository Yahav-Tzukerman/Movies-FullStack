const NAME_REGEX = /^[A-Za-z\u0590-\u05FF\s]{2,30}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_.-]{3,20}$/;

export const PERMISSIONS = [
  "View Subscriptions",
  "Create Subscriptions",
  "Update Subscriptions",
  "Delete Subscriptions",
  "View Movies",
  "Create Movies",
  "Update Movies",
  "Delete Movies",
];

export function validateUserData({ firstName, lastName, sessionTimeOut }) {
  return [
    ...validateName(firstName),
    ...validateName(lastName),
    ...validateSessionTimeOut(sessionTimeOut),
  ];
}

export function validateName(name) {
  if (!name || !NAME_REGEX.test(name)) {
    return ["Invalid name: 2-30 chars, letters only (Hebrew/English)"];
  }
  return [];
}

export function validateUserName(userName) {
  if (!userName || !USERNAME_REGEX.test(userName)) {
    return ["Invalid username: 3-20 chars, letters, numbers, _, ., -"];
  }
  return [];
}

export function validateSessionTimeOut(sessionTimeOut) {
  if (
    sessionTimeOut === undefined ||
    isNaN(sessionTimeOut) ||
    sessionTimeOut < 1 ||
    sessionTimeOut > 1440
  ) {
    return ["Invalid sessionTimeOut: must be 1-1440 minutes"];
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
