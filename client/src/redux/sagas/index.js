import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { watchRestoreState } from "./appSaga";

export default function* rootSaga() {
  yield all([
    authSaga(), // Handles auth persistence
    watchRestoreState(), // Handles app state restoration
  ]);
}
