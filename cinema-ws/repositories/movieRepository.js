// repositories/movieRepository.js
const axios = require("axios");
const config = require("../config/config");

const baseUrl = config.subsWsUrl + "/movies";

const getAllMovies = async () => {
  return await axios.get(baseUrl, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

const createMovie = async (movieData) => {
  return await axios.post(baseUrl, movieData, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

const updateMovie = async (id, updateData) => {
  return await axios.put(`${baseUrl}/${id}`, updateData, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

const deleteMovie = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
