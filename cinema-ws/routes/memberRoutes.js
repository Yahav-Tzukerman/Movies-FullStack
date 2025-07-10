const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");
const authMiddleware = require("../middleware/authMiddleware");
const permissionsMiddleware = require("../middleware/permissionsMiddleware");

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Subscription Members
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of members
 */
router.get(
  "/",
  authMiddleware,
  permissionsMiddleware("View Subscriptions"),
  memberController.getAllMembers
);

/**
 * @swagger
 * /api/members:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member created
 */
router.post(
  "/",
  authMiddleware,
  permissionsMiddleware("Create Subscriptions"),
  memberController.createMember
);

/**
 * @swagger
 * /api/members/{id}:
 *   put:
 *     summary: Update a member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member updated
 */
router.put(
  "/:id",
  authMiddleware,
  permissionsMiddleware("Update Subscription"),
  memberController.updateMember
);

/**
 * @swagger
 * /api/members/{id}:
 *   delete:
 *     summary: Delete a member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Member ID
 *     responses:
 *       200:
 *         description: Member deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  permissionsMiddleware("Delete Subscriptions"),
  memberController.deleteMember
);

module.exports = router;
