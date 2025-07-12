// repositories/movieRepository.js
const Movie = require("../models/movieModel");

const getAllMovies = async () => {
  return await Movie.find();
};

const createMovie = async (movieData) => {
  const movie = new Movie(movieData);
  return await movie.save();
};

const updateMovie = async (id, updateData) => {
  return await Movie.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteMovie = async (id) => {
  return await Movie.findByIdAndDelete(id);
};

const getMovieById = async (id) => {
  return await Movie.findById(id);
};

const getMovieByName = async (name) => {
  return await Movie.findOne({ name });
};

module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
  getMovieByName,
};
