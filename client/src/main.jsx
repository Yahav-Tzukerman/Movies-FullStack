import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/globals.css";
import store from "./redux/store.js";
import Test from "../Test.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {/* <Test /> */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
