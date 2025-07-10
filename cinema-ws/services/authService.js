// services/authService.js
const userService = require("./userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (userName, password) => {
  const user = await userService.findUserByUserName(userName);
  if (!user) {
    console.error(`Login failed: User ${userName} not found`);
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.error(`Login failed: Incorrect password for user ${userName}`);
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    { id: user.userId, userName: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = { login };
