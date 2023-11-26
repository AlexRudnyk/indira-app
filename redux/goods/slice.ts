import {
  ActionReducerMapBuilder,
  PayloadAction,
  Slice,
  createSlice,
} from "@reduxjs/toolkit";
import {
  addGoods,
  getAllGoods,
  getGoodById,
  editGood,
  deleteGood,
} from "./operations";
import { AddGoodProps, GoodProps } from "@/types";
import { RootState } from "../store";

interface GoodsState {
  goods: GoodProps[];
  isRefreshing: boolean;
  error: boolean;
}

const initialState: GoodsState = {
  goods: [],
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

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGoods.pending, handlePending)
      .addCase(
        getAllGoods.fulfilled,
        (state: RootState, action: PayloadAction<GoodProps[]>) => {
          state.goods = action.payload;
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(getAllGoods.rejected, handleRejected)

      .addCase(addGoods.pending, handlePending)
      .addCase(
        addGoods.fulfilled,
        (state: RootState, action: PayloadAction<GoodProps>) => {
          state.goods = [...state.goods, action.payload];
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(addGoods.rejected, handleRejected)

      .addCase(getGoodById.pending, handlePending)
      .addCase(
        getGoodById.fulfilled,
        (state: RootState, action: PayloadAction<GoodProps>) => {
          state.goods = state.goods.filter(
            (good: GoodProps) => good._id === action.payload._id
          );
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(getGoodById.rejected, handleRejected)
      .addCase(editGood.pending, handlePending)
      .addCase(
        editGood.fulfilled,
        (state: RootState, action: PayloadAction<GoodProps>) => {
          const index = state.goods.findIndex(
            (good: GoodProps) => good._id === action.payload._id
          );
          state.goods.splice(index, 1, action.payload);
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(editGood.rejected, handleRejected)
      .addCase(deleteGood.pending, handlePending)
      .addCase(
        deleteGood.fulfilled,
        (state: RootState, action: PayloadAction<string>) => {
          state.goods = state.goods.filter(
            (good: GoodProps) => good._id !== action.payload
          );
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(deleteGood.rejected, handleRejected);
  },
});

export default goodsSlice.reducer;
