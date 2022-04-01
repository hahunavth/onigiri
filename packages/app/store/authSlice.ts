import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

export type UserInfo = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

type AuthState = {
  isLogin: boolean;
  userInfo: UserInfo | null;
  loginAt: number | null;
};

const initialState: AuthState = {
  isLogin: false,
  userInfo: null,
  loginAt: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.isLogin = true;
      state.loginAt = Date.now();
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.isLogin = false;
      state.loginAt = null;
    },
    signUp: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.isLogin = true;
      state.loginAt = Date.now();
    }
  }
});

export const authLoginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (u: UserInfo, { getState, dispatch }) => {}
);

//
export default authSlice.reducer;

export const authActions = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;
