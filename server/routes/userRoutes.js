const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../utils/authMiddleware');
const permissionsMiddleware = require('../utils/permissionsMiddleware');

router.get('/', authMiddleware, permissionsMiddleware('View Users'), userController.getAllUsers);
router.post('/', authMiddleware, permissionsMiddleware('Create Users'), userController.createUser);
router.delete('/:id', authMiddleware, permissionsMiddleware('Delete Users'), userController.deleteUser);

module.exports = router;
