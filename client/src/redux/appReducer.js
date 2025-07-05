import { createReducer } from "@reduxjs/toolkit";
import { restoreStateSuccess } from "../redux/actions/appActions";

const initialState = {
  darkMode: true,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(restoreStateSuccess, (state, action) => {
      return { ...state, ...action.payload }; // Merge restored state
    })
    .addCase("TOGGLE_THEME", (state) => {
      state.darkMode = !state.darkMode;
    });
});

export const toggleTheme = () => ({
  type: "TOGGLE_THEME",
});

export default appReducer;
