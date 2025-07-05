import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authSlice";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  cart: cartReducer,
});

export default rootReducer;
