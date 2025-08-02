import axios from "axios";

const API =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_CINEMA_WS_PROD
    : import.meta.env.VITE_CINEMA_WS_LOCAL;
const USERS = `${API}/users`;

class UsersService {
  getAllUsers() {
    return axios.get(USERS);
  }

  getUserById(id) {
    return axios.get(`${USERS}/${id}`);
  }

  createUser(user) {
    return axios.post(USERS, user);
  }

  updateUser(id, user) {
    return axios.put(`${USERS}/${id}`, user);
  }

  deleteUser(id) {
    return axios.delete(`${USERS}/${id}`);
  }
}

export default new UsersService();
