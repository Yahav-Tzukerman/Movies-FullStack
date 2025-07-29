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

const subscribeToMovie = async (memberId, movieEntry) => {
  const subscription = await getSubscriptionByMemberId(memberId);
  if (!subscription) {
    throw new Error(`No subscription found for member with ID ${memberId}`);
  }
  subscription.movies.push(movieEntry);
  return await subscription.save();
};

const deleteSubscription = async (id) => {
  return await Subscription.findByIdAndDelete(id);
};

const deleteSubscriptionByMemberId = async (memberId) => {
  return await Subscription.deleteMany({ memberId });
};

const removeMovieFromAllSubscriptions = async (movieId) => {
  return await Subscription.updateMany(
    {},
    { $pull: { movies: { movieId } } }
  );
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
  subscribeToMovie,
  deleteSubscription,
  getSubscriptionById,
  getSubscriptionByMemberId,
  deleteSubscriptionByMemberId,
  removeMovieFromAllSubscriptions
};
