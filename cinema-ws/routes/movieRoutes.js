const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middleware/authMiddleware");
const permissionsMiddleware = require("../middleware/permissionsMiddleware");

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movies management
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of movies
 */
router.get(
  "/",
  authMiddleware,
  permissionsMiddleware("View Movies"),
  movieController.getAllMovies
);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
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
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *               premiered:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Movie created
 */
router.post(
  "/",
  authMiddleware,
  permissionsMiddleware("Create Movies"),
  movieController.createMovie
);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *               premiered:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Movie updated
 */
router.put(
  "/:id",
  authMiddleware,
  permissionsMiddleware("Update Movie"),
  movieController.updateMovie
);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  permissionsMiddleware("Delete Movies"),
  movieController.deleteMovie
);

module.exports = router;
