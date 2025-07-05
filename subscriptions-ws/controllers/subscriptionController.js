// controllers/subscriptionController.js
const subscriptionService = require("../services/subscriptionService");

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.createSubscription(req.body);
    res.status(201).json(subscription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addMovieToSubscription = async (req, res) => {
  try {
    console.log("Adding movie to subscription:", req.params.id, req.body);
    const updatedSubscription =
      await subscriptionService.addMovieToSubscription(req.params.id, req.body);
    res.json(updatedSubscription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    await subscriptionService.deleteSubscription(req.params.id);
    res.json({ message: "Subscription deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllSubscriptions,
  createSubscription,
  addMovieToSubscription,
  deleteSubscription,
};
