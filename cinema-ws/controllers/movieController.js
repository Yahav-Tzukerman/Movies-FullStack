// controllers/movieController.js
const movieService = require('../services/movieService');

const getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await movieService.updateMovie(req.params.id, req.body);
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await movieService.deleteMovie(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllMovies, createMovie, updateMovie, deleteMovie };
