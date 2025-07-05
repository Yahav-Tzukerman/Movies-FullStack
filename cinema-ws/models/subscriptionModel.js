// models/subscriptionModel.js
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  movies: [
    {
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
      date: Date
    }
  ]
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
