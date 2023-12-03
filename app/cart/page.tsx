import { CartList } from "@/components";
import React from "react";

const Cart = async () => {
  return (
    <div className="mo:max-w-[480px] sm:w-[480px] md:w-[768px] lg:w-[1280px] mx-auto p-5">
      <CartList />
    </div>
  );
};

export default Cart;
