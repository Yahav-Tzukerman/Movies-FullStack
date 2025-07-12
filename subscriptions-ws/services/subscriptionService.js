// services/subscriptionService.js
const {
  validateSubscription,
} = require("../validations/subscriptionValidation");
const subscriptionRepository = require("../repositories/subscriptionRepository");
const AppError = require("../exceptions/AppError");

const getAllSubscriptions = async () => {
  return await subscriptionRepository.getAllSubscriptions();
};

const createSubscription = async (subscriptionData) => {
  const errors = validateSubscription(subscriptionData);
  if (errors.length) throw new AppError("Validation error", 400, errors);

  const existingSubscription =
    await subscriptionRepository.getSubscriptionByMemberId(
      subscriptionData.memberId
    );
  if (existingSubscription) {
    throw new AppError(
      `Subscription for member with ID ${subscriptionData.memberId} already exists`,
      400
    );
  }

  return await subscriptionRepository.createSubscription(subscriptionData);
};

const addMovieToSubscription = async (subscriptionId, movieEntry) => {
  const existingSubscription = await subscriptionRepository.getSubscriptionById(
    subscriptionId
  );
  if (!existingSubscription) {
    throw new AppError(`Subscription with ID ${subscriptionId} not found`, 404);
  }
  return await subscriptionRepository.addMovieToSubscription(
    subscriptionId,
    movieEntry
  );
};

const deleteSubscription = async (id) => {
  const existingSubscription = await subscriptionRepository.getSubscriptionById(
    id
  );
  if (!existingSubscription) {
    throw new AppError(`Subscription with ID ${id} not found`, 404);
  }
  return await subscriptionRepository.deleteSubscription(id);
};

module.exports = {
  getAllSubscriptions,
  createSubscription,
  addMovieToSubscription,
  deleteSubscription,
};
