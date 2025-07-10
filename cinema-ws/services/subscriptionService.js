// services/subscriptionService.js
const subscriptionRepository = require("../repositories/subscriptionRepository");

const getAllSubscriptions = async () => {
  const response = await subscriptionRepository.getAllSubscriptions();
  return response.data;
};

const createSubscription = async (subscriptionData) => {
  const response = await subscriptionRepository.createSubscription(
    subscriptionData
  );
  return response.data;
};

const addMovieToSubscription = async (subscriptionId, movieEntry) => {
  const response = await subscriptionRepository.addMovieToSubscription(
    subscriptionId,
    movieEntry
  );
  return response.data;
};

const deleteSubscription = async (id) => {
  const response = await subscriptionRepository.deleteSubscription(id);
  return response.data;
};

module.exports = {
  getAllSubscriptions,
  createSubscription,
  addMovieToSubscription,
  deleteSubscription,
};
