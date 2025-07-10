// utilities/bootstrapAdmin.js
const userJsonRepository = require("../repositories/userJsonRepository");
const userDBRepository = require("../repositories/userDBRepository");
const permissionsService = require("../services/permissionsService");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const ADMIN_USER_NAME = "admin";
const ADMIN_PASSWORD = "admin123";
const ADMIN_FIRST_NAME = "Admin";
const ADMIN_LAST_NAME = "User";
const ADMIN_SESSION_TIMEOUT = 60;
const FULL_ADMIN_PERMISSIONS = [
  "View Subscriptions",
  "Create Subscriptions",
  "Delete Subscriptions",
  "Update Subscription",
  "View Movies",
  "Create Movies",
  "Delete Movies",
  "Update Movie",
  "View Users",
  "Create Users",
  "Update Users",
  "Delete Users",
];

async function bootstrapAdmin() {
  // חפש ב-json לפי שם פרטי+שם משפחה או לפי id קבוע (אם תעדיף)
  let adminUser = (await userJsonRepository.getAllUsers()).find(
    (u) => u.firstName === ADMIN_FIRST_NAME && u.lastName === ADMIN_LAST_NAME
  );
  let adminId = adminUser ? adminUser.id : uuidv4();

  if (!adminUser) {
    // אין userName ב-json
    const now = new Date().toISOString();
    adminUser = {
      id: adminId,
      firstName: ADMIN_FIRST_NAME,
      lastName: ADMIN_LAST_NAME,
      createdDate: now,
      sessionTimeOut: ADMIN_SESSION_TIMEOUT,
    };
    await userJsonRepository.addUser(adminUser);
    console.log("✔️ Admin created in users.json");
  } else {
    adminId = adminUser.id;
    console.log("✔️ Admin already exists in users.json");
  }

  await permissionsService.setPermissionsForUser(
    adminId,
    FULL_ADMIN_PERMISSIONS
  );

  let dbUser = await userDBRepository.findUserByUserName(ADMIN_USER_NAME);
  if (!dbUser) {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await userDBRepository.createUser({
      userName: ADMIN_USER_NAME,
      password: hash,
      userId: adminId,
    });
    console.log("✔️ Admin created in UsersDB (MongoDB)");
  } else {
    console.log("✔️ Admin already exists in UsersDB");
  }

  return adminId;
}

module.exports = bootstrapAdmin;
