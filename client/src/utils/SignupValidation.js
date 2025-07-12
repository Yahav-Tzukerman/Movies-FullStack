import { validateUsername, validatePassword } from "./regexValidations";

export const SignupValidation = {
  validateForm: (formData) => {
    const { firstName, lastName, username, password, confirmPassword } =
      formData;
    const errors = [];

    if (firstName.length < 2) errors.push("firstName");
    if (lastName.length < 2) errors.push("lastName");
    if (!validateUsername(username)) errors.push("username");
    if (!validatePassword(password)) errors.push("password");
    if (password !== confirmPassword) errors.push("confirmPassword");

    return errors;
  },

  createErrorMessage: (errors) => {
    return `Fix the following fields: ${errors.join(", ")}`;
  },
};
