import { takeLatest, put, call } from "redux-saga/effects";
import { setUser, clearUser, initializeAuth } from "../authSlice";
import {
  saveAuthToLocalStorage,
  loadAuthFromLocalStorage,
  clearAuthFromLocalStorage,
} from "../../utils/localStorage";

// Save auth state on login
function* saveAuthSaga(action) {
  try {
    yield call(saveAuthToLocalStorage, action.payload); // Save to localStorage
  } catch (error) {
    console.error("Failed to save auth:", error);
  }
}

// Load auth state on app initialization
function* loadAuthSaga() {
  try {
    const userData = yield call(loadAuthFromLocalStorage);
    if (userData) {
      yield put(initializeAuth(userData)); // Initialize Redux state
    }
  } catch (error) {
    console.error("Failed to load auth:", error);
  }
}

// Clear auth state on logout
function* clearAuthSaga() {
  try {
    yield call(clearAuthFromLocalStorage); // Remove from localStorage
  } catch (error) {
    console.error("Failed to clear auth:", error);
  }
}

function* validateTokenSaga() {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = yield call([user, user.getIdToken]); // Get the current token
      const userDoc = yield call(getDoc, doc(db, "users", user.uid)); // Fetch user data from Firestore

      if (userDoc.exists()) {
        const userData = userDoc.data();
        yield put(
          initializeAuth({
            user: { ...userData, token }, // Update the user with the latest token
            isAuthenticated: true,
          })
        );
      } else {
        throw new Error("User role not found in Firestore");
      }
    } else {
      yield put(clearUser());
    }
  } catch (error) {
    console.error("Failed to validate token:", error);
    yield put(clearUser()); // Clear user on failure
  }
}

// Watcher saga
export function* authSaga() {
  yield takeLatest(setUser.type, saveAuthSaga); // Save on login
  yield takeLatest("auth/initialize", loadAuthSaga); // Load on app init
  yield takeLatest(clearUser.type, clearAuthSaga); // Clear on logout
  yield takeLatest("auth/initialize", validateTokenSaga); // Validate token on app init
}
