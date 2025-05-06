// repositories/userRepository.js
const User = require('../models/userModel');

const findUserByUserName = async (userName) => {
  return await User.findOne({ userName });
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getAllUsers = async () => {
  return await User.find();
};

const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  findUserByUserName,
  createUser,
  getAllUsers,
  deleteUserById
};
