// controllers/authController.js
const authService = require("../services/authService");
const userService = require("../services/userService");

const createAccount = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userData = await userService.createAccount(userName, password);

    if (!userData) {
      return res.status(400).json({ message: "Account creation failed" });
    }
    res.json({ message: "Account created. You can now login." });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userData = await authService.login(userName, password);
    res.json(userData);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { login, createAccount };
