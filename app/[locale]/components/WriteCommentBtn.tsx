"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const WriteCommentBtn = ({
  toggleModal,
}: {
  toggleModal: (value: boolean) => void;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const t = useTranslations("writeCommentBtn");

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
        {t("write")}
      </button>
    )
  );
};

export default WriteCommentBtn;
