"use client";

import { useState } from "react";

const WriteCommentBtn = ({
  toggleModal,
}: {
  toggleModal: (value: boolean) => void;
}) => {
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggle = () => {
    // setIsModalOpen(!isModalOpen);
    toggleModal(true);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="p-4 rounded-2xl border-gray-200 border-2"
    >
      Leave Comment
    </button>
  );
};

export default WriteCommentBtn;
