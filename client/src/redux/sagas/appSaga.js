import { put, takeEvery, call, all } from "redux-saga/effects";
import { loadState } from "../../utils/localStorage";
import { restoreState, restoreStateSuccess } from "../actions/appActions";

// Worker saga: Load state from localStorage
function* handleRestoreState() {
  try {
    const state = yield call(loadState); // Load state from localStorage
    if (state) {
      yield put(restoreStateSuccess(state)); // Dispatch action with loaded state
    }
  } catch (err) {
    console.error("Failed to restore state", err);
  }
}

// Watcher saga
export function* watchRestoreState() {
  yield takeEvery(restoreState.type, handleRestoreState); // Listen for restore action
}

export default function* rootSaga() {
  yield all([watchRestoreState()]);
}
