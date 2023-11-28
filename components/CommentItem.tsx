import { CommentProps } from "@/types";
import React from "react";

const CommentItem = ({ comment }: { comment: CommentProps }) => {
  const date = comment.createdAt
    ? new Date(comment.createdAt).toLocaleDateString()
    : "Unknown Date";

  return (
    <li className="p-4 mb-5 outline outline-2 outline-gray-300 rounded-xl">
      <p className="mb-3 text-gray-500">{comment.userName}</p>
      <p className="mb-3">{comment.text}</p>
      <div className="flex justify-end">
        <p className="text-gray-400">{date}</p>
      </div>
    </li>
  );
};

export default CommentItem;
