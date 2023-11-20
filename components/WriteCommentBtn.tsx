"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const WriteCommentBtn = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <button type="button" className="p-4 rounded-2xl border-gray-200 border-2">
      Leave Comment
    </button>
  );
};

export default WriteCommentBtn;
