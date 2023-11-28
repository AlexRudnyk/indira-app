import { CartList } from "@/components";
import { fetchGoods } from "@/utils";
import React from "react";

const Cart = async () => {
  const allGoods = await fetchGoods();

  return (
    <div className="w-[1280px] mx-auto p-5">
      <CartList allGoods={allGoods} />
    </div>
  );
};

export default Cart;
