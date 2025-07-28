import axios from "axios";

const API =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_CINEMA_WS_PROD
    : import.meta.env.VITE_CINEMA_WS_LOCAL;
const AUTH = `${API}/auth`;

class AuthService {
  login(userName, password) {
    return axios.post(`${AUTH}/login`, { userName, password });
  }

  createAccount(userName, password) {
    return axios.post(`${AUTH}/createAccount`, { userName, password });
  }
}

export default new AuthService();
