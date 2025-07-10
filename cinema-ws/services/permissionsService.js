// services/permissionsService.js
const permissionsRepository = require("../repositories/permissionsRepository");

const getPermissionsForUser = async (userId) => {
  const perms = await permissionsRepository.getPermissionsByUserId(userId);
  return perms ? perms.permissions : [];
};

const setPermissionsForUser = async (userId, permissionsArr) => {
  await permissionsRepository.setPermissionsForUser(userId, permissionsArr);
};

const deleteUserPermissions = async (userId) => {
  await permissionsRepository.deleteUserPermissions(userId);
};

module.exports = {
  getPermissionsForUser,
  setPermissionsForUser,
  deleteUserPermissions,
};
