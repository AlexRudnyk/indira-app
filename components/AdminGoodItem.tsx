"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { EditGoodProps, GoodProps } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ImPencil, ImBin2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteGood, editGood } from "@/redux/goods/operations";
import { ModalEditGood } from ".";

interface AdminGoodItemProps {
  good: GoodProps;
}

const AdminGoodItem = ({ good }: AdminGoodItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleModalOpenToggle = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalSubmit = (values: EditGoodProps): void => {
    dispatch(editGood(values));
  };

  return (
    <>
      <li className="flex items-center mb-[30px] last:mb-0 shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] p-1 rounded-xl">
        <Image
          src={good.photoURL}
          width={100}
          height={100}
          alt="Admin good item"
          className="mr-[30px] rounded-xl"
        />
        <div className="">
          <p className="w-[450px] text-lg font-semibold mr-[50px]">
            {good.title}
          </p>
          <p>Comments ({good.comments?.length})</p>
        </div>
        <p className="mr-[80px]">{good.price} UAH</p>
        <button
          type="button"
          className="mr-[40px] p-3"
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
