import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosService";
import { toast } from "react-toastify";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    toast.dismiss();
    try {
      const response = await axiosInstance.post("/auth/login", loginData);
      const data = await response.data;
      if (data.success) {
        localStorage.setItem("token", `${data.token}`);
      }
      toast.success(data.message);
      window.location.replace("/");
      return data;
    } catch (err) {
      toast.error(err.response.data.error);
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerAction = createAsyncThunk(
  "auth/register",
  async (registerData, { rejectWithValue }) => {
    toast.dismiss();
    try {
      const response = await axiosInstance.post("/auth/register", registerData);
      const data = await response.data;
      if (data.success) {
        window.location.replace("/login");
        toast.success(data.message);
      }
      return data;
    } catch (err) {
      toast.error(err.response.data.error);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCurrentUserAction = createAsyncThunk(
  "auth/getCurrentUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/current-user");
      console.log("resp", response);
      const data = response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
