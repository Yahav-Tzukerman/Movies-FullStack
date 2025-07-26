import axios from "axios";
const SUBSCRIPTIONS = `http://localhost:8000/api/subscriptions`;

class SubscriptionsService {
  getAllSubscriptions(token) {
    return axios.get(SUBSCRIPTIONS, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createSubscription(subscription, token) {
    return axios.post(SUBSCRIPTIONS, subscription, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  addMovieToSubscription(id, movieData, token) {
    return axios.put(`${SUBSCRIPTIONS}/${id}/addMovie`, movieData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteSubscription(id, token) {
    return axios.delete(`${SUBSCRIPTIONS}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new SubscriptionsService();
