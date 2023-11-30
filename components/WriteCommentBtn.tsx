"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const WriteCommentBtn = ({
  toggleModal,
}: {
  toggleModal: (value: boolean) => void;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const handleToggle = () => {
    toggleModal(true);
  };

  return (
    user.role !== "admin" && (
      <button
        type="button"
        onClick={handleToggle}
        className="p-4 rounded-2xl border-gray-200 border-2"
      >
        Leave Comment
      </button>
    )
  );
};

export default WriteCommentBtn;
