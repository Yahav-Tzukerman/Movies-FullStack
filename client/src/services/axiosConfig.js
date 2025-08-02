import axios from "axios";
import store from "../redux/store";
import { clearUser } from "../redux/authSlice";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export function setupAxiosInterceptors() {
  axios.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.user?.token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        error.response.status === 401 &&
        !window.location.pathname.includes("/signin") &&
        !window.location.pathname.includes("/login")
      ) {
        store.dispatch(clearUser());
        history.push("/signin");
      }
      return Promise.reject(error);
    }
  );
}
