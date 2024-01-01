import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserAction,
  loginAction,
  registerAction,
} from "../actions/authActions";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  user: null,
  token,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
      state.token = null;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getCurrentUserAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(getCurrentUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice;
