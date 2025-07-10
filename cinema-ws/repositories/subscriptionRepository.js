// repositories/subscriptionRepository.js
const axios = require("axios");
const config = require("../config/config");

const baseUrl = config.subsWsUrl + "/subscriptions";

const getAllSubscriptions = async () => {
  return await axios.get(baseUrl, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

const createSubscription = async (subscriptionData) => {
  return await axios.post(baseUrl, subscriptionData, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

const addMovieToSubscription = async (subscriptionId, movieEntry) => {
  return await axios.put(`${baseUrl}/${subscriptionId}`, movieEntry, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

const deleteSubscription = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      "x-api-key": config.subsWsApiKey,
    },
  });
};

module.exports = {
  getAllSubscriptions,
  createSubscription,
  addMovieToSubscription,
  deleteSubscription,
};
