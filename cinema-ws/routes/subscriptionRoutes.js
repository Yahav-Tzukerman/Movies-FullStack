const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const authMiddleware = require("../middleware/authMiddleware");
const permissionsMiddleware = require("../middleware/permissionsMiddleware");

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscriptions management
 */

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subscriptions
 */
router.get(
  "/",
  authMiddleware,
  permissionsMiddleware("View Subscriptions"),
  subscriptionController.getAllSubscriptions
);

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *               movies:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     movieId:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date
 *     responses:
 *       201:
 *         description: Subscription created
 */
router.post(
  "/",
  authMiddleware,
  permissionsMiddleware("Create Subscriptions"),
  subscriptionController.createSubscription
);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   put:
 *     summary: Add a movie to a subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Subscription ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Movie added to subscription
 */
router.put(
  "/:id/addMovie",
  authMiddleware,
  permissionsMiddleware("Update Subscription"),
  subscriptionController.addMovieToSubscription
);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  permissionsMiddleware("Delete Subscriptions"),
  subscriptionController.deleteSubscription
);

module.exports = router;
