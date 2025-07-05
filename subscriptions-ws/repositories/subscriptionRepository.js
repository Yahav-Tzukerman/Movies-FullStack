// repositories/subscriptionRepository.js
const Subscription = require("../models/subscriptionModel");

const getAllSubscriptions = async () => {
  return await Subscription.find()
    .populate("memberId")
    .populate("movies.movieId");
};

const createSubscription = async (subscriptionData) => {
  const subscription = new Subscription(subscriptionData);
  return await subscription.save();
};

const addMovieToSubscription = async (subscriptionId, movieEntry) => {
  return await Subscription.findByIdAndUpdate(
    subscriptionId,
    { $push: { movies: movieEntry } },
    { new: true }
  );
};

const deleteSubscription = async (id) => {
  return await Subscription.findByIdAndDelete(id);
};

module.exports = {
  getAllSubscriptions,
  createSubscription,
  addMovieToSubscription,
  deleteSubscription,
};
