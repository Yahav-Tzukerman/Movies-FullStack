import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

export default rootReducer;
