import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {

      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoggedIn = false;
    },
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;