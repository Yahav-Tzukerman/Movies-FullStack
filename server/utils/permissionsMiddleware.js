// utils/permissionsMiddleware.js
const jsonfile = require('jsonfile');
const path = require('path');

const permissionsFile = path.join(__dirname, '../permissions.json');

const permissionsMiddleware = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const permissionsData = await jsonfile.readFile(permissionsFile);
      const userPermissions = permissionsData.find(p => p.id === req.user.id);

      if (!userPermissions || !userPermissions.permissions.includes(requiredPermission)) {
        return res.status(403).json({ message: 'Forbidden: missing permission' });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Permission check failed' });
    }
  };
};

module.exports = permissionsMiddleware;
