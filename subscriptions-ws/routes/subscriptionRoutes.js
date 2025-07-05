const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management
 */

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: List of subscriptions
 */
router.get("/", subscriptionController.getAllSubscriptions);

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
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
router.post("/", subscriptionController.createSubscription);

/**
 * @swagger
 * /api/subscriptions/{id}/addMovie:
 *   put:
 *     summary: Add a movie to a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subscription ID
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
 *       400:
 *         description: Bad request
 */
router.put("/:id/addMovie", subscriptionController.addMovieToSubscription);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subscription ID
 *     responses:
 *       200:
 *         description: Subscription deleted
 *       404:
 *         description: Subscription not found
 */
router.delete("/:id", subscriptionController.deleteSubscription);

module.exports = router;
