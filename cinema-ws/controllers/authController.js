// controllers/authController.js
const authService = require("../services/authService");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");

const createAccount = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await userService.findUserByUserName(userName);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Contact admin." });
    }

    if (user.password && user.password !== "") {
      return res.status(400).json({ message: "Account already created." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Account created. You can now login." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const token = await authService.login(userName, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { login, createAccount };
