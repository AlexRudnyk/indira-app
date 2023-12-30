"use client";

import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "@/redux/comments/operations";
import { useGlobalContext } from "../context/store";
import { useTranslations } from "next-intl";

const ReadCommentsBtn = ({ goodId }: { goodId: string }) => {
  const comments = useSelector((state: RootState) => state.comments.comments);
  const dispatch = useDispatch<AppDispatch>();
  const { isCommentOpen, setIsCommentOpen } = useGlobalContext();
  const t = useTranslations("readCommentsBtn");

  const handleCommentToggle = (): void => {
    setIsCommentOpen(!isCommentOpen);
  };

  useEffect(() => {
    dispatch(getComments(goodId));
  }, [dispatch, goodId]);

  return (
    <button
      type="button"
      className="p-4 rounded-2xl border-gray-200 border-2 mr-9"
      disabled={comments.length === 0}
      onClick={handleCommentToggle}
    >
      {t("comments")} ({comments.length})
    </button>
  );
};

export default ReadCommentsBtn;
