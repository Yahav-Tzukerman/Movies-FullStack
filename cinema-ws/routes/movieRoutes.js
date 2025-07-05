const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authMiddleware = require('../utils/authMiddleware');
const permissionsMiddleware = require('../utils/permissionsMiddleware');

router.get('/', authMiddleware, permissionsMiddleware('View Movies'), movieController.getAllMovies);
router.post('/', authMiddleware, permissionsMiddleware('Create Movies'), movieController.createMovie);
router.put('/:id', authMiddleware, permissionsMiddleware('Update Movie'), movieController.updateMovie);
router.delete('/:id', authMiddleware, permissionsMiddleware('Delete Movies'), movieController.deleteMovie);

module.exports = router;
