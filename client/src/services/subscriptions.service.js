import axios from "axios";

const API =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_CINEMA_WS_PROD
    : import.meta.env.VITE_CINEMA_WS_LOCAL;
const SUBSCRIPTIONS = `${API}/subscriptions`;

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

  addMovieToSubscriptionByMember(memberId, movieData, token) {
    return axios.put(
      `${SUBSCRIPTIONS}/by-member/${memberId}/addMovie`,
      movieData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  deleteSubscription(id, token) {
    return axios.delete(`${SUBSCRIPTIONS}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new SubscriptionsService();
