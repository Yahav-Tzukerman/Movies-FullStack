// models/movieModel.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genres: [String],
  image: String,
  premiered: Date
});

module.exports = mongoose.model('Movie', movieSchema);
