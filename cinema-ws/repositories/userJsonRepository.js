// repositories/userJsonRepository.js
const path = require("path");
const { readJson, writeJson } = require("./jsonRepository");

const usersFile = path.join(__dirname, "../data/users.json");

const getAllUsers = async () => await readJson(usersFile);

const findUserById = async (id) =>
  (await getAllUsers()).find((u) => u.id === id);

const addUser = async (userData) => {
  const users = await getAllUsers();
  users.push(userData);
  await writeJson(usersFile, users);
};

const updateUser = async (id, updateData) => {
  const users = await getAllUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updateData };
    await writeJson(usersFile, users);
    return users[idx];
  }
  return null;
};

const deleteUser = async (id) => {
  const users = await getAllUsers();
  const filtered = users.filter((u) => u.id !== id);
  await writeJson(usersFile, filtered);
};

module.exports = {
  getAllUsers,
  findUserById,
  addUser,
  updateUser,
  deleteUser,
};
