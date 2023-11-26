import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddGoodProps, EditGoodProps, GoodProps } from "@/types";

axios.defaults.baseURL = "https://indira-backend.vercel.app";

export const getAllGoods = createAsyncThunk(
  "goods/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/goods/getgoods");
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getGoodById = createAsyncThunk(
  "goods/getById",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/goods/id/${id}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addGoods = createAsyncThunk(
  "goods/addGood",
  async (credentials: AddGoodProps, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/goods/addgood", credentials);
      //   toast.success(i18n.t("Item_added"));
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editGood = createAsyncThunk(
  "goods/editGood",
  async (values: EditGoodProps, thunkAPI) => {
    try {
      const { data } = await axios.patch("/api/goods/edit", values);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteGood = createAsyncThunk(
  "goods/deleteGood",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/api/goods/delete/${id}`);
      return data._id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
