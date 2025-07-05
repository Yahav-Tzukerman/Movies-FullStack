import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    initializeAuth(state, action) {
      const userData = action.payload;
      if (userData) {
        state.user = userData;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { setUser, clearUser, setLoading, initializeAuth } =
  authSlice.actions;
export default authSlice.reducer;
