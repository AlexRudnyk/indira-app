"use client";

import React, { useState } from "react";
import { GoodProps } from "@/types";
import Image from "next/image";

const CartItem = ({ good }: { good: GoodProps }) => {
  const [count, setCount] = useState<number>(1);

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
        <div className="flex items-center w-[200px] ml-auto">
          <button className="bg-gray-300 w-[40px] h-[40px]  rounded-md flex justify-center items-center">
            <span className="text-2xl">-</span>
          </button>
          <p className="mx-4 text-2xl">{count}</p>
          <button className="bg-gray-300 w-[40px] h-[40px]  rounded-md flex justify-center items-center">
            <span className="text-2xl">+</span>
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
