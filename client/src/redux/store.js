import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer"; // Updated rootReducer with authSlice
import rootSaga from "./sagas/appSaga";
import { loadState, saveState } from "../utils/localStorage";

const sagaMiddleware = createSagaMiddleware();

// Load persisted state
const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer, // rootReducer now includes authSlice
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk since we're using saga
      serializableCheck: false, // Disable serializable state invariant middleware
    }).concat(sagaMiddleware),
  preloadedState: persistedState, // Initialize with persisted state
});

// Subscribe to store updates and save to localStorage
store.subscribe(() => {
  const state = store.getState();
  saveState({
    app: state.app,   // Save app slice
    auth: state.auth, // Save auth slice
    cart: state.cart, // Save cart slice
  });
});

// Run saga middleware
sagaMiddleware.run(rootSaga);

export default store;
