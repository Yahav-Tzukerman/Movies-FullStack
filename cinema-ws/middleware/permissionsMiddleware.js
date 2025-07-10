// middleware/permissionsMiddleware.js
const permissionsService = require("../services/permissionsService");

const permissionsMiddleware = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const userPermissions = await permissionsService.getPermissionsForUser(
        userId
      );
      if (!userPermissions.includes(requiredPermission)) {
        return res
          .status(403)
          .json({ message: "Forbidden: missing permission" });
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Permission check failed" });
    }
  };
};

module.exports = permissionsMiddleware;
