"use client";

import React, { useEffect } from "react";
import { GoodCard } from "@/components";
import { GoodProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { getAllGoods } from "@/redux/goods/operations";
import { AppDispatch, RootState } from "@/redux/store";

const HomePageClient = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allGoods = useSelector((state: RootState) => state.goods.goods);

  useEffect(() => {
    dispatch(getAllGoods());
  }, [dispatch]);

  return (
    <ul className="w-[1280px] mx-auto p-5 pb-10 grid grid-cols-3 gap-9 mt-[100px]">
      {allGoods.length > 0 &&
        allGoods.map((good: GoodProps) => (
          <GoodCard key={good._id} good={good} />
        ))}
    </ul>
  );
};

export default HomePageClient;
