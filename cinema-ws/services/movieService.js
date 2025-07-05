// services/movieService.js
const movieRepository = require('../repositories/movieRepository');

const getAllMovies = async () => {
  return await movieRepository.getAllMovies();
};

const createMovie = async (movieData) => {
  return await movieRepository.createMovie(movieData);
};

const updateMovie = async (id, updateData) => {
  return await movieRepository.updateMovie(id, updateData);
};

const deleteMovie = async (id) => {
  return await movieRepository.deleteMovie(id);
};

module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie
};
