import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { GoodProps } from "@/types";
import { RootState } from "../store";
import { login, logout, refreshUser } from "./operations";

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

const handlePending = (state: RootState) => {
  state.isRefreshing = true;
};

const handleRejected = (
  state: RootState,
  action: PayloadAction<any | boolean>
) => {
  state.isRefreshing = false;
  state.error = action.payload.message || false;
};

const authSlice: Slice<AuthState, {}, "auth"> = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<RootState>) => {
    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = false;
      })
      .addCase(
        login.rejected,
        (state, action: PayloadAction<any | boolean>) => {
          state.isRefreshing = false;
          state.error = action.payload.message || false;
        }
      )

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state, action) => {
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
      })
      .addCase(logout.rejected, handleRejected)

      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;

        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = false;
      })
      .addCase(refreshUser.rejected, handleRejected);
  },
});

export default authSlice.reducer;
