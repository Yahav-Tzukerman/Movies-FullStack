// services/permissionsService.js
const { validatePermissions } = require("../validations/userValidation");
const permissionsRepository = require("../repositories/permissionsRepository");
const AppError = require("../exceptions/AppError");

const getPermissionsForUser = async (userId) => {
  const perms = await permissionsRepository.getPermissionsByUserId(userId);
  return perms ? perms.permissions : [];
};

const setPermissionsForUser = async (userId, permissionsArr) => {
  if (!userId || typeof userId !== "string")
    throw new AppError("Invalid userId for setting permissions", 400);

  const errors = validatePermissions(permissionsArr);
  if (errors.length) throw new AppError("Validation error", 400, errors);

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
