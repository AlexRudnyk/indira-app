"use client";

import { CustomBtnProps } from "@/types";

const CustomBtn = ({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
}: CustomBtnProps) => {
  return (
    <button
      disabled={false}
      type={btnType || "button"}
      className={`flex flex-row relative justify-center items-center py-3 px-6 outline-none shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out hover:scale-110 ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
    </button>
  );
};

export default CustomBtn;
