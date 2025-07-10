const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & Account Creation
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login (returns JWT)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT returned on success
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/createAccount:
 *   post:
 *     summary: Create account for existing user (set password)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account created
 *       404:
 *         description: User not found
 *       400:
 *         description: Account already exists
 */
router.post("/createAccount", authController.createAccount);

module.exports = router;
