import axios from "axios";

const API =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_CINEMA_WS_PROD
    : import.meta.env.VITE_CINEMA_WS_LOCAL;
const SUBSCRIPTIONS = `${API}/subscriptions`;

class SubscriptionsService {
  getAllSubscriptions() {
    return axios.get(SUBSCRIPTIONS);
  }

  createSubscription(subscription) {
    return axios.post(SUBSCRIPTIONS, subscription);
  }

  addMovieToSubscriptionByMember(memberId, movieData) {
    return axios.put(
      `${SUBSCRIPTIONS}/by-member/${memberId}/addMovie`,
      movieData
    );
  }

  deleteSubscription(id) {
    return axios.delete(`${SUBSCRIPTIONS}/${id}`);
  }
}

export default new SubscriptionsService();
