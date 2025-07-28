import axios from "axios";
import store from "../redux/store";
import { clearUser } from "../redux/authSlice";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export function setupAxiosInterceptors() {
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
