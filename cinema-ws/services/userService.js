// services/userService.js
const userJsonRepository = require("../repositories/userJsonRepository");
const userDBRepository = require("../repositories/userDBRepository");
const permissionsService = require("../services/permissionsService");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

// שליפת כל המשתמשים מה-json (להצגה)
const getAllUsers = async () => {
  return await userJsonRepository.getAllUsers();
};

const getUserById = async (id) => {
  const userJson = await userJsonRepository.findUserById(id);
  const userDb = await userDBRepository.findUserByUserId(id);
  return {
    ...userJson,
    userName: userDb?.userName,
    hasPassword: !!userDb?.password,
    permissions: await permissionsService.getPermissionsForUser(id),
  };
};

const createUser = async (userData, password, permissions = []) => {
  const id = userData.id || uuid.v4();

  if (await userJsonRepository.findUserById(id))
    throw new Error("User already exists in users.json");

  if (await userDBRepository.findUserByUserName(userData.userName))
    throw new Error("User already exists in DB");

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
  const dbUser = await userDBRepository.findUserByUserName(userName);
  if (!dbUser) throw new Error("User missing in DB. Contact admin.");
  const user = await userJsonRepository.findUserById(dbUser.userId);
  if (!user) throw new Error("User not found. Contact admin.");
  if (dbUser.password && dbUser.password !== "placeholder")
    throw new Error("Account already created.");

  const hashed = await bcrypt.hash(password, 10);
  dbUser.password = hashed;
  await dbUser.save();

  return { message: "Account created. You can now login." };
};

const updateUser = async (id, updateData, newPassword, newPermissions) => {
  await userJsonRepository.updateUser(id, updateData);

  if (newPassword) {
    const dbUser = await userDBRepository.findUserByUserId(id);
    if (dbUser) {
      dbUser.password = await bcrypt.hash(newPassword, 10);
      await dbUser.save();
    }
  }

  if (newPermissions) {
    await permissionsService.setPermissionsForUser(id, newPermissions);
  }

  return await getUserById(id);
};

const deleteUser = async (id) => {
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
