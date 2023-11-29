import { CartList } from "@/components";
import { fetchGoods } from "@/utils";
import React from "react";

const Cart = async () => {
  const allGoods = await fetchGoods();

  return (
    <div className="mo:max-w-[480px] sm:w-[480px] md:w-[768px] lg:w-[1280px] mx-auto p-5">
      <CartList allGoods={allGoods} />
    </div>
  );
};

export default Cart;
