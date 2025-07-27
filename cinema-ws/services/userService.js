// services/userService.js
const {
  validateUserData,
  validatePassword,
  validatePermissions,
  validateUserFull,
} = require("../validations/userValidation");
const userJsonRepository = require("../repositories/userJsonRepository");
const userDBRepository = require("../repositories/userDBRepository");
const permissionsService = require("../services/permissionsService");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const AppError = require("../exceptions/AppError");

const getAllUsers = async () => {
  const usersJson = await userJsonRepository.getAllUsers();
  const usersDb = await userDBRepository.getAllUsers();
  return Promise.all(
    usersJson.map(async (user) => {
      const dbUser = usersDb.find((db) => db.userId === user.id);
      const permissions = await permissionsService.getPermissionsForUser(
        user.id
      );
      return {
        ...user,
        userName: dbUser?.userName,
        permissions,
      };
    })
  );
};

const getUserById = async (id) => {
  const userJson = await userJsonRepository.findUserById(id);
  const userDb = await userDBRepository.findUserByUserId(id);
  if (!userJson) throw new AppError("User not found in users.json", 404);
  if (!userDb) throw new AppError("User not found in DB", 404);
  return {
    ...userJson,
    userName: userDb?.userName,
    hasPassword: !!userDb?.password,
    permissions: await permissionsService.getPermissionsForUser(id),
  };
};

const createUser = async (userData, password, permissions = []) => {
  const errors = validateUserData(userData);
  errors.push(...validatePermissions(permissions));
  console.log(errors);

  if (errors.length) throw new AppError(errors, 400);

  const id = userData.id || uuid.v4();

  if (await userJsonRepository.findUserById(id))
    throw new AppError("User already exists in users.json", 400);

  if (await userDBRepository.findUserByUserName(userData.userName))
    throw new AppError("User already exists in DB", 400);

  const now = new Date().toISOString();
  const jsonUser = {
    id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    createdDate: userData.createdDate || now,
    sessionTimeOut: userData.sessionTimeOut || 30,
  };
  await userJsonRepository.addUser(jsonUser);

  let dbUser;
  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    dbUser = await userDBRepository.createUser({
      userName: userData.userName,
      password: hashed,
      userId: id,
    });
  } else {
    dbUser = await userDBRepository.createUser({
      userName: userData.userName,
      password: "",
      userId: id,
    });
  }

  await permissionsService.setPermissionsForUser(id, permissions);

  return { ...jsonUser, userName: dbUser.userName, dbUserId: dbUser._id };
};

// createAccount תמיד לפי userId
const createAccount = async (userName, password) => {
  if (!userName || !password) {
    throw new AppError("Username and password are required.", 400);
  }
  const errors = validatePassword(password);
  if (errors.length) throw new AppError(errors.join(", "), 400);

  const dbUser = await userDBRepository.findUserByUserName(userName);
  if (!dbUser) throw new AppError("User missing in DB. Contact admin.", 404);
  const user = await userJsonRepository.findUserById(dbUser.userId);
  if (!user) throw new AppError("User not found. Contact admin.", 404);
  if (dbUser.password && dbUser.password !== "")
    throw new AppError("Account already created.", 400);

  const hashed = await bcrypt.hash(password, 10);
  dbUser.password = hashed;
  await dbUser.save();

  return { message: "Account created. You can now login." };
};

const updateUser = async (id, updateData, newPermissions) => {
  const userJson = await userJsonRepository.findUserById(id);
  if (!userJson) throw new AppError("User not found in users.json", 404);

  const errors = validateUserFull({
    ...updateData,
    permissions: newPermissions,
  });
  if (errors.length) throw new AppError("Validation error", 400, errors);

  await userJsonRepository.updateUser(id, updateData);

  if( updateData.userName) {
    const dbUser = await userDBRepository.findUserByUserId(id);
    if (!dbUser) throw new AppError("User not found in DB", 404);
    dbUser.userName = updateData.userName;
    await userDBRepository.updateUserById(dbUser._id, dbUser);
  }

  if (newPermissions) {
    await permissionsService.setPermissionsForUser(id, newPermissions);
  }

  return await getUserById(id);
};

const deleteUser = async (id) => {
  const userJson = await userJsonRepository.findUserById(id);
  if (!userJson) throw new AppError("User not found in users.json", 404);
  await userJsonRepository.deleteUser(id);
  const dbUser = await userDBRepository.findUserByUserId(id);
  if (dbUser) await userDBRepository.deleteUserById(dbUser._id);
  await permissionsService.deleteUserPermissions(id);
  return { message: "User deleted" };
};

// למצוא יוזר לפי userName ב-db בלבד
const findUserByUserName = async (userName) => {
  return await userDBRepository.findUserByUserName(userName);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  createAccount,
  updateUser,
  deleteUser,
  findUserByUserName,
};
