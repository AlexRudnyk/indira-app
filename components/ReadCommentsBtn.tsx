"use client";

import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "@/redux/comments/operations";

const ReadCommentsBtn = ({ goodId }: { goodId: string }) => {
  const comments = useSelector((state: RootState) => state.comments.comments);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getComments(goodId));
  }, [dispatch, goodId]);

  return (
    <button
      type="button"
      className="p-4 rounded-2xl border-gray-200 border-2 mr-9"
      disabled={comments.length === 0}
    >
      Comments ({comments.length})
    </button>
  );
};

export default ReadCommentsBtn;
