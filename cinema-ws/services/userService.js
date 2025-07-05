// services/userService.js
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const userToSave = { ...userData, password: hashedPassword };
  return await userRepository.createUser(userToSave);
};

const deleteUser = async (id) => {
  return await userRepository.deleteUserById(id);
};

const findUserByUserName = async (userName) => {
  return await userRepository.findUserByUserName(userName);
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  findUserByUserName
};
