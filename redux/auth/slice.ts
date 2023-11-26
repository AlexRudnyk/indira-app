import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GoodProps, UserProps } from "@/types";
import {
  addToCart,
  clearCart,
  deleteFromCart,
  login,
  logout,
  refreshUser,
  signup,
} from "./operations";

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
  error: any | boolean;
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

const handlePending = (state: AuthState) => {
  state.isRefreshing = true;
};

const handleRejected = (
  state: AuthState,
  action: PayloadAction<any | boolean>
) => {
  state.isRefreshing = false;
  state.error = action.payload.message || false;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, handlePending)
      .addCase(signup.fulfilled, (state: AuthState) => {
        state.isRefreshing = false;
        state.error = false;
      })
      .addCase(signup.rejected, handleRejected)

      .addCase(login.pending, handlePending)
      .addCase(
        login.fulfilled,
        (state: AuthState, action: PayloadAction<AuthState>) => {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          state.isLoggedIn = true;
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(
        login.rejected,
        (state: AuthState, action: PayloadAction<any | boolean>) => {
          state.isRefreshing = false;
          state.error = action.payload.message || false;
        }
      )

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state: AuthState) => {
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
      .addCase(
        refreshUser.fulfilled,
        (state: AuthState, action: PayloadAction<UserProps>) => {
          state.user = action.payload;

          state.isLoggedIn = true;
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(refreshUser.rejected, handleRejected)
      .addCase(addToCart.pending, handlePending)
      .addCase(
        addToCart.fulfilled,
        (state: AuthState, action: PayloadAction<GoodProps>) => {
          state.user.goodsInCart = [...state.user.goodsInCart, action.payload];
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(addToCart.rejected, handleRejected)
      .addCase(deleteFromCart.pending, handlePending)
      .addCase(
        deleteFromCart.fulfilled,
        (state: AuthState, action: PayloadAction<GoodProps>) => {
          state.user.goodsInCart = state.user.goodsInCart.filter(
            (item) => item !== action.payload
          );
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(deleteFromCart.rejected, handleRejected)
      .addCase(clearCart.pending, handlePending)
      .addCase(clearCart.fulfilled, (state: AuthState) => {
        state.user.goodsInCart = [];
        state.isRefreshing = false;
        state.error = false;
      })
      .addCase(clearCart.rejected, handleRejected);
  },
});

export default authSlice.reducer;
