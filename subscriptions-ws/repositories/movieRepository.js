// repositories/movieRepository.js
const Movie = require("../models/movieModel");

const getAllMovies = async () => {
    const movies = await Movie.aggregate([
    {
      $lookup: {
        from: "subscriptions",
        let: { movieId: "$_id" },
        pipeline: [
          { $unwind: "$movies" },
          { $match: { $expr: { $eq: ["$movies.movieId", "$$movieId"] } } },
          {
            $lookup: {
              from: "members",
              localField: "memberId",
              foreignField: "_id",
              as: "member",
            },
          },
          { $unwind: "$member" },
          {
            $project: {
              _id: 0,
              memberId: "$member._id",
              memberName: "$member.name",
              date: "$movies.date",
            },
          },
        ],
        as: "subscribers",
      },
    },
  ]);
  return movies;
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
