// services/subscriptionService.js
const subscriptionRepository = require("../repositories/subscriptionRepository");

const getAllSubscriptions = async () => {
  return await subscriptionRepository.getAllSubscriptions();
};

const createSubscription = async (subscriptionData) => {
  return await subscriptionRepository.createSubscription(subscriptionData);
};

const addMovieToSubscription = async (subscriptionId, movieEntry) => {
  console.log("Adding movie to subscription:", subscriptionId, movieEntry);
  return await subscriptionRepository.addMovieToSubscription(
    subscriptionId,
    movieEntry
  );
};

const deleteSubscription = async (id) => {
  return await subscriptionRepository.deleteSubscription(id);
};

module.exports = {
  getAllSubscriptions,
  createSubscription,
  addMovieToSubscription,
  deleteSubscription,
};
