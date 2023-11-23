"use client";

import React, { useState } from "react";
import { GoodProps } from "@/types";
import Image from "next/image";

const CartItem = ({ good }: { good: GoodProps }) => {
  return (
    <li className="mb-8">
      <div className="flex rounded-lg shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] p-2">
        <Image
          src={good.photoURL}
          alt="good in cart"
          width={100}
          height={100}
          className="mr-6 rounded-lg"
        />
        <div>
          <h1 className="text-xl font-bold mb-3">{good.title}</h1>
          <p>{good.text}</p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
