// services/movieService.js
const { validateMovie } = require("../validations/movieValidation");
const movieRepository = require("../repositories/movieRepository");
const AppError = require("../exceptions/AppError");

const getAllMovies = async () => {
  const response = await movieRepository.getAllMovies();
  return response.data;
};

const createMovie = async (movieData) => {
  const errors = validateMovie(movieData);
  if (errors.length) throw new AppError("Validation error", 400, errors);
  const response = await movieRepository.createMovie(movieData);
  return response.data;
};

const updateMovie = async (id, updateData) => {
  const errors = validateMovie(updateData);
  if (errors.length) throw new AppError("Validation error", 400, errors);
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
