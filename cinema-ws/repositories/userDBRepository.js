// repositories/userDBRepository.js
const User = require("../models/userModel");

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

const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const findUserByUserId = async (userId) => {
  return await User.findOne({ userId });
};

module.exports = {
  findUserByUserName,
  createUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
  findUserByUserId,
};
