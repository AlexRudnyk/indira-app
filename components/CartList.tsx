"use client";

import { GoodProps } from "@/types";
import { useGlobalContext } from "@/app/context/store";
import { CartItem } from ".";
import { useEffect, useState } from "react";

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
    <div>
      <p>Your cart is empty</p>
    </div>
  );
};

export default CartList;
