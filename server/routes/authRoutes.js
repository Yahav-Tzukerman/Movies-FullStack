const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// No auth/permission needed for login
router.post('/login', authController.login);
router.post('/createAccount', authController.createAccount);

module.exports = router;
