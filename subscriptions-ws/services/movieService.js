// services/movieService.js
const { validateMovie } = require("../validations/movieValidation");
const movieRepository = require("../repositories/movieRepository");
const subscriptionRepository = require("../repositories/subscriptionRepository");
const AppError = require("../exceptions/AppError");

const getAllMovies = async () => {
  return await movieRepository.getAllMovies();
};

const createMovie = async (movieData) => {
  const errors = validateMovie(movieData);
  if (errors.length) throw new AppError("Validation error", 400, errors);
  const existingMovie = await movieRepository.getMovieByName(movieData.name);
  if (existingMovie)
    throw new AppError(`Movie with name ${movieData.name} already exists`, 400);

  return await movieRepository.createMovie(movieData);
};

const updateMovie = async (id, updateData) => {
  const errors = validateMovie(updateData);
  if (errors.length) throw new AppError("Validation error", 400, errors);
  const existingMovie = await movieRepository.getMovieById(id);
  if (!existingMovie) throw new AppError(`Movie with ID ${id} not found`, 404);

  return await movieRepository.updateMovie(id, updateData);
};

const deleteMovie = async (id) => {
  const existingMovie = await movieRepository.getMovieById(id);
  if (!existingMovie) throw new AppError(`Movie with ID ${id} not found`, 404);

  await subscriptionRepository.removeMovieFromAllSubscriptions(id);
  return await movieRepository.deleteMovie(id);
};

module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
