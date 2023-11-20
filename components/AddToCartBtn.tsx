"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/auth/operations";

const AddToCartBtn = ({ id }: { id: string }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCartClick = () => {
    dispatch(addToCart(id));
  };

  return (
    <button
      type="button"
      className="flex justify-center items-center py-3 px-6 outline-none shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out hover:scale-110 bg-[var(--primary)] text-white rounded-2xl mr-10"
      onClick={handleAddToCartClick}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
