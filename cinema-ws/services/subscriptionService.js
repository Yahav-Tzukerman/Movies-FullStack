// services/subscriptionService.js
const {
  validateSubscription,
} = require("../validations/subscriptionValidation");
const subscriptionRepository = require("../repositories/subscriptionRepository");
const AppError = require("../exceptions/AppError");

const getAllSubscriptions = async () => {
  const response = await subscriptionRepository.getAllSubscriptions();
  return response.data;
};

const createSubscription = async (subscriptionData) => {
  const errors = validateSubscription(subscriptionData);
  if (errors.length) throw new AppError("Validation error", 400, errors);
  const response = await subscriptionRepository.createSubscription(
    subscriptionData
  );
  return response.data;
};

const addMovieToSubscription = async (subscriptionId, movieEntry) => {
  if (!subscriptionId || !movieEntry) {
    throw new AppError("Subscription ID and movie entry are required.", 400);
  }
  if (!movieEntry.movieId || !movieEntry.date) {
    throw new AppError("Movie entry must include movieId and date.", 400);
  }
  const errors = validateSubscription({
    memberId: subscriptionId,
    movies: [movieEntry],
  });
  if (errors.length) throw new AppError("Validation error", 400, errors);
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
