import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  getComments,
  deleteComment,
  replyComment,
} from "./operations";
import { CommentProps } from "@/types";

interface CommentsState {
  comments: CommentProps[];
  isRefreshing: boolean;
  error: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isRefreshing: false,
  error: false,
};

const handlePending = (state: CommentsState) => {
  state.isRefreshing = true;
};

const handleRejected = (
  state: CommentsState,
  action: PayloadAction<any | boolean>
) => {
  state.isRefreshing = false;
  state.error = action.payload.message || false;
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, handlePending)
      .addCase(
        getComments.fulfilled,
        (state: CommentsState, action: PayloadAction<CommentProps[]>) => {
          state.comments = action.payload;
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(getComments.rejected, handleRejected)

      .addCase(addComment.pending, handlePending)
      .addCase(
        addComment.fulfilled,
        (state: CommentsState, action: PayloadAction<CommentProps>) => {
          state.comments = [...state.comments, action.payload];
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(addComment.rejected, handleRejected)

      .addCase(deleteComment.pending, handlePending)
      .addCase(
        deleteComment.fulfilled,
        (state: CommentsState, action: PayloadAction<string>) => {
          state.comments = state.comments.filter(
            (comment) => comment._id !== action.payload
          );
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(deleteComment.rejected, handleRejected)
      .addCase(replyComment.pending, handlePending)
      .addCase(
        replyComment.fulfilled,
        (state: CommentsState, action: PayloadAction<CommentProps>) => {
          const index = state.comments.findIndex(
            (comment) => comment._id === action.payload._id
          );
          state.comments.splice(index, 1, action.payload);
          state.isRefreshing = false;
          state.error = false;
        }
      )
      .addCase(replyComment.rejected, handleRejected);
  },
});

export default commentsSlice.reducer;
