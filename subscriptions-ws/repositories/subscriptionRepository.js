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

const getSubscriptionById = async (id) => {
  return await Subscription.findById(id)
    .populate("memberId")
    .populate("movies.movieId");
};

const getSubscriptionByMemberId = async (memberId) => {
  return await Subscription.findOne({ memberId });
};

module.exports = {
  getAllSubscriptions,
  createSubscription,
  addMovieToSubscription,
  deleteSubscription,
  getSubscriptionById,
  getSubscriptionByMemberId,
};
