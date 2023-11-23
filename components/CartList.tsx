"use client";

import { GoodProps } from "@/types";
import { useGlobalContext } from "@/app/context/store";
import { CartItem, CustomBtn } from ".";
import { useEffect, useState } from "react";
import Link from "next/link";

const CartList = ({ allGoods }: { allGoods: GoodProps[] }) => {
  const { cart } = useGlobalContext();
  const [goodsArray, setGoodsArray] = useState<GoodProps[]>([]);

  useEffect(() => {
    const foundGoods = cart
      .map((goodId: string) => allGoods.find((good) => good?._id === goodId))
      .filter((good): good is GoodProps => !!good);

    setGoodsArray(foundGoods);
  }, [allGoods, cart]);

  return cart.length ? (
    <ul>
      {goodsArray.map((good: GoodProps) => (
        <CartItem key={good._id} good={good} />
      ))}
    </ul>
  ) : (
    <div className="flex flex-col w-full justify-center items-center mt-11">
      <p className="font-bold text-5xl mb-28">Your cart is empty</p>
      <Link href="/">
        <CustomBtn
          btnType="button"
          title="To go shopping!"
          containerStyles="bg-[var(--primary)] text-white rounded-2xl mr-3"
        />
      </Link>
    </div>
  );
};

export default CartList;
