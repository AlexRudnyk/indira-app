import { AppDispatch } from "@/redux/store";
import { GoodProps } from "@/types";
import Image from "next/image";
import React from "react";
import { ImPencil, ImBin2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteGood } from "@/redux/goods/operations";

interface AdminGoodItemProps {
  good: GoodProps;
}

const AdminGoodItem = ({ good }: AdminGoodItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li className="flex items-center mb-[30px] last:mb-0 shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] p-1 rounded-xl">
      <Image
        src={good.photoURL}
        width={100}
        height={100}
        alt="Admin good item"
        className="mr-[30px] rounded-xl"
      />
      <p className="w-[450px] text-lg font-semibold mr-[50px]">{good.title}</p>
      <p className="mr-[80px]">{good.price} UAH</p>
      <button type="button" className="mr-[40px] p-3">
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
  );
};

export default AdminGoodItem;
