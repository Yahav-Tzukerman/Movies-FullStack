// repositories/permissionsRepository.js
const path = require("path");
const { readJson, writeJson } = require("./jsonRepository");

const permissionsFile = path.join(__dirname, "../data/permissions.json");

const getAllPermissions = async () => await readJson(permissionsFile);

const getPermissionsByUserId = async (userId) =>
  (await getAllPermissions()).find((p) => p.id === userId);

const setPermissionsForUser = async (userId, permissionsArr) => {
  const all = await getAllPermissions();
  const idx = all.findIndex((p) => p.id === userId);
  if (idx !== -1) {
    all[idx].permissions = permissionsArr;
  } else {
    all.push({ id: userId, permissions: permissionsArr });
  }
  await writeJson(permissionsFile, all);
};

const deleteUserPermissions = async (userId) => {
  const all = await getAllPermissions();
  const filtered = all.filter((p) => p.id !== userId);
  await writeJson(permissionsFile, filtered);
};

module.exports = {
  getAllPermissions,
  getPermissionsByUserId,
  setPermissionsForUser,
  deleteUserPermissions,
};
