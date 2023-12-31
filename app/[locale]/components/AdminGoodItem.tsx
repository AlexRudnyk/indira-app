"use client";

import { AppDispatch } from "@/redux/store";
import { EditGoodProps, GoodProps } from "@/types";
import React, { useState } from "react";
import { ImPencil, ImBin2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteGood, editGood } from "@/redux/goods/operations";
import { ModalEditGood } from ".";
import { CldImage } from "next-cloudinary";
import { useTranslations } from "next-intl";

interface AdminGoodItemProps {
  good: GoodProps;
}

const AdminGoodItem = ({ good }: AdminGoodItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("adminGoodItem");

  const handleModalOpenToggle = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalSubmit = (values: EditGoodProps): void => {
    dispatch(editGood(values));
  };

  return (
    <>
      <li className="flex items-center mb-[30px] last:mb-0 shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] p-1 rounded-xl">
        <CldImage
          src={good.photoURL}
          width={100}
          height={100}
          crop="fill"
          gravity="auto"
          alt="Admin good item"
          className="mo:mr-[10px] sm:mr-[10px] md:mr-[10px] lg:mr-[30px] rounded-xl"
        />
        <div className="md:mr-[10px] lg:mr-[50px]">
          <p className="md:w-[150px] lg:w-[400px] text-sm md:text-base lg:text-lg md:font-semibold">
            {good.title}
          </p>
          <p className="text-sm md:text-base">
            {t("comments")} ({good.comments?.length})
          </p>
        </div>
        <p className="md:mr-[10px] lg:mr-[80px]">
          {good.price} {t("currency")}
        </p>
        <button
          type="button"
          className="mr-[20px] md:mr-[10px] lg:mr-[40px] p-3"
          onClick={handleModalOpenToggle}
        >
          <ImPencil />
        </button>
        <button
          type="button"
          className="p-3"
          onClick={() => dispatch(deleteGood(good._id))}
        >
          <ImBin2 />
        </button>
      </li>
      {isModalOpen && (
        <ModalEditGood
          onClose={handleModalOpenToggle}
          onSubmit={handleModalSubmit}
          good={good}
        />
      )}
    </>
  );
};

export default AdminGoodItem;
