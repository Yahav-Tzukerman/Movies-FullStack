// services/movieService.js
const movieRepository = require("../repositories/movieRepository");

const getAllMovies = async () => {
  const response = await movieRepository.getAllMovies();
  return response.data;
};

const createMovie = async (movieData) => {
  const response = await movieRepository.createMovie(movieData);
  return response.data;
};

const updateMovie = async (id, updateData) => {
  const response = await movieRepository.updateMovie(id, updateData);
  return response.data;
};

const deleteMovie = async (id) => {
  const response = await movieRepository.deleteMovie(id);
  return response.data;
};

module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
