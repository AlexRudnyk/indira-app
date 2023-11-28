"use client";

const WriteCommentBtn = ({
  toggleModal,
}: {
  toggleModal: (value: boolean) => void;
}) => {
  const handleToggle = () => {
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
