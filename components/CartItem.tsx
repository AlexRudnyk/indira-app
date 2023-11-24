"use client";

import React, { useEffect, useState } from "react";
import { GoodProps } from "@/types";
import Image from "next/image";
import { ImBin2 } from "react-icons/im";
import { useGlobalContext } from "@/app/context/store";

const CartItem = ({
  good,
  getTotalSum,
  goodInfo,
}: {
  good: GoodProps;
  getTotalSum: (sum: number) => void;
  goodInfo: ({
    title,
    price,
    count,
  }: {
    title: string;
    price: number;
    count: number;
  }) => void;
}) => {
  const [count, setCount] = useState<number>(1);
  const { handleDeleteFromCart } = useGlobalContext();

  useEffect(() => {
    getTotalSum(good.price * count);
    goodInfo({
      title: good.title,
      price: good.price,
      count,
    });
  }, [count, getTotalSum, good.price, good.title, goodInfo]);

  return (
    <li className="mb-8">
      <div className="flex rounded-lg shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] p-1">
        <Image
          src={good.photoURL}
          alt="good in cart"
          width={120}
          height={120}
          className="mr-6 rounded-lg"
        />
        <div className="w-[600px]">
          <h1 className="text-xl font-bold mb-3">{good.title}</h1>
          <p>{good.text}</p>
        </div>
        <div className="flex items-center w-auto ml-auto mr-10">
          <p className="mr-8">
            Price: <span className="font-bold">{good.price}</span> UAH
          </p>
          <button
            type="button"
            onClick={() => setCount((prev) => prev - 1)}
            disabled={count <= 1}
            className="bg-gray-300 w-[40px] h-[40px]  rounded-md flex justify-center items-center transition ease-in-out duration-100 hover:scale-110"
          >
            <span className="text-2xl">-</span>
          </button>
          <p className="text-2xl w-[60px] text-center">{count}</p>
          <button
            type="button"
            onClick={() => setCount((prev) => prev + 1)}
            className="bg-gray-300 w-[40px] h-[40px]  rounded-md flex justify-center items-center transition ease-in-out duration-100 hover:scale-110"
          >
            <span className="text-2xl">+</span>
          </button>
          <button
            type="button"
            className="p-2 ml-6"
            onClick={() => handleDeleteFromCart(good._id)}
          >
            <ImBin2 />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
