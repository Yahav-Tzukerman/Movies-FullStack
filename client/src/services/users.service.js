import axios from "axios";

const API =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_CINEMA_WS_PROD
    : import.meta.env.VITE_CINEMA_WS_LOCAL;
const USERS = `${API}/users`;

class UsersService {
  getAllUsers(token) {
    return axios.get(USERS, { headers: { Authorization: `Bearer ${token}` } });
  }

  getUserById(id, token) {
    return axios.get(`${USERS}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createUser(user, token) {
    return axios.post(USERS, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateUser(id, user, token) {
    return axios.put(`${USERS}/${id}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteUser(id, token) {
    return axios.delete(`${USERS}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new UsersService();
