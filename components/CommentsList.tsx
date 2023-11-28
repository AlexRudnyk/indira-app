"use client";

import React, { useEffect } from "react";
import { useGlobalContext } from "@/app/context/store";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "@/redux/comments/operations";
import { AppDispatch, RootState } from "@/redux/store";
import { CommentProps } from "@/types";
import { CommentItem } from ".";

const CommentsList = ({ goodId }: { goodId: string }) => {
  const { isCommentOpen } = useGlobalContext();
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector((state: RootState) => state.comments.comments);
  const commentsReversed = [...comments].reverse();

  useEffect(() => {
    dispatch(getComments(goodId));
  }, [dispatch, goodId]);

  return (
    isCommentOpen && (
      <ul>
        {commentsReversed.map((comment: CommentProps) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </ul>
    )
  );
};

export default CommentsList;
