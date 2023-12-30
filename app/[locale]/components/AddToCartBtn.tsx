"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGlobalContext } from "../context/store";
import { useTranslations } from "next-intl";

const AddToCartBtn = ({ id }: { id: string }) => {
  const { cart, setCart } = useGlobalContext();
  const user = useSelector((state: RootState) => state.auth.user);
  const t = useTranslations("addToCartBtn");

  const handleAddCartClick = () => {
    const isInCart = cart.includes(id);
    if (isInCart) {
      return;
    } else {
      localStorage.setItem("cart", JSON.stringify([...cart, id]));
      setCart([...cart, id]);
    }
  };

  return (
    user.role !== "admin" && (
      <button
        type="button"
        className="flex justify-center items-center py-3 px-6 outline-none shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out hover:scale-110 bg-[var(--primary)] text-white rounded-2xl mr-10 w-[130px]"
        onClick={handleAddCartClick}
      >
        {t("addToCart")}
      </button>
    )
  );
};

export default AddToCartBtn;
