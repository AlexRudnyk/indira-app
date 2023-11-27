import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CommentProps } from "@/types";

axios.defaults.baseURL = "https://indira-backend.vercel.app";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/comments/getcomments/${id}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ id, values }: { id: string; values: CommentProps }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `/api/comments/addcomment/${id}`,
        values
      );
      toast.success("Comment is added");
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/api/comments/delete/${id}`);
      return data._id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const replyComment = createAsyncThunk(
  "comments/replyComment",
  async ({ id, values }: { id: string; values: CommentProps }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/api/comments/reply/${id}`, values);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
