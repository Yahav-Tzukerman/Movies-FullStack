// services/authService.js
const {
  validateUserName,
  validatePassword,
} = require("../validations/userValidation");
const userService = require("./userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../exceptions/AppError");

const login = async (userName, password) => {
  const errors = [...validateUserName(userName), ...validatePassword(password)];
  if (errors.length) throw new AppError("Validation error", 400, errors);
  const user = await userService.findUserByUserName(userName);
  if (!user) {
    console.error(`Login failed: User ${userName} not found`);
    throw new AppError("Invalid username or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.error(`Login failed: Incorrect password for user ${userName}`);
    throw new AppError("Invalid username or password", 401);
  }

  const token = jwt.sign(
    { id: user.userId, userName: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = { login };
