const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 */
router.get("/", movieController.getAllMovies);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
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
router.post("/", movieController.createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie ID
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
 *       400:
 *         description: Bad request
 */
router.put("/:id", movieController.updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie deleted
 *       404:
 *         description: Movie not found
 */
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
