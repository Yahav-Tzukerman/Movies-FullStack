// repositories/movieRepository.js
const Movie = require('../models/movieModel');

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

module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie
};
