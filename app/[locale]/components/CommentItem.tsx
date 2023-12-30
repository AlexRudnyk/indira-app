"use client";

import React, { useState } from "react";
import { CommentProps } from "@/types";
import { ImPencil, ImBin2 } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { replyComment, deleteComment } from "@/redux/comments/operations";
import { ReplyModal } from ".";

const CommentItem = ({ comment }: { comment: CommentProps }) => {
  const [replyModalIsOpen, setReplyModalIsOpen] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const date = comment.createdAt
    ? new Date(comment.createdAt).toLocaleDateString()
    : "Unknown Date";

  const handleCommentEditClick = () => {
    setReplyModalIsOpen(!replyModalIsOpen);
  };

  const handleCommentDeleteClick = () => {
    if (comment._id) dispatch(deleteComment(comment._id));
  };

  const handleReplyModalClose = () => {
    setReplyModalIsOpen(!replyModalIsOpen);
  };

  const handleReplyModalSubmit = (values: CommentProps) => {
    if (user.role === "admin") {
      if (comment._id) dispatch(replyComment({ id: comment._id, values }));
    }
  };

  return (
    <li className="p-4 mb-5 outline outline-2 outline-gray-300 rounded-xl">
      <p className="mb-3 text-gray-500">{comment.userName}:</p>
      <p className="mb-3">{comment.text}</p>
      <div className="flex justify-end">
        <p className="text-gray-400">{date}</p>
      </div>
      {comment.reply && (
        <div className="mb-3 border-t-2 border-gray-300">
          <p className="mb-3 mt-4  text-gray-500">Anna:</p>
          <p>{comment.reply}</p>
        </div>
      )}
      {user.role === "admin" && (
        <div className="flex justify-center">
          <button
            type="button"
            className="p-3 mr-20"
            onClick={handleCommentEditClick}
          >
            <ImPencil />
          </button>
          <button
            type="button"
            className="p-3"
            onClick={handleCommentDeleteClick}
          >
            <ImBin2 />
          </button>
        </div>
      )}
      {replyModalIsOpen && (
        <ReplyModal
          onSubmit={handleReplyModalSubmit}
          onClose={handleReplyModalClose}
        />
      )}
    </li>
  );
};

export default CommentItem;
