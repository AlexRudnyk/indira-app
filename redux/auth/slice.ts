import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { GoodProps } from "@/types";

interface AuthState {
  user: {
    _id: null | string;
    name: null | string;
    email: null | string;
    phone: null | string;
    role: null | string;
    goodsInCart: GoodProps[];
  };
  accessToken: null | string;
  refreshToken: null | string;

  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | boolean;
}

const initialState: AuthState = {
  user: {
    _id: null,
    name: null,
    email: null,
    phone: null,
    role: null,
    goodsInCart: [],
  },
  accessToken: null,
  refreshToken: null,

  isLoggedIn: false,
  isRefreshing: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
      state.isRefreshing = false;
      state.error = false;
    },
    logoutState: (state) => {
      state.user = {
        _id: null,
        name: null,
        email: null,
        phone: null,
        role: null,
        goodsInCart: [],
      };
      state.accessToken = null;
      state.refreshToken = null;

      state.isLoggedIn = false;
      state.isRefreshing = false;
      state.error = false;
    },
  },
});

export const { loginState, logoutState } = authSlice.actions;

export default authSlice.reducer;
