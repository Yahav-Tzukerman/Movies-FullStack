import axios from "axios";

const API =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_CINEMA_WS_LOCAL
    : import.meta.env.VITE_CINEMA_WS_PROD;
const AUTH = `http://localhost:8000/api/auth`;

class AuthService {
  login(userName, password) {
    return axios.post(`${AUTH}/login`, { userName, password });
  }

  createAccount(userName, password) {
    return axios.post(`${AUTH}/createAccount`, { userName, password });
  }
}

export default new AuthService();
