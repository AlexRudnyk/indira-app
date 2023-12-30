"use client";

import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoodProps } from "@/types";
import { Link } from "@/navigation";
import { CldImage } from "next-cloudinary";
import { getAllGoods } from "@/redux/goods/operations";
import { useTranslations } from "next-intl";

const Carousel = ({ good }: { good: GoodProps }) => {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("carousel");

  useEffect(() => {
    dispatch(getAllGoods());
  }, [dispatch]);

  const allGoods = useSelector((state: RootState) => state.goods.goods);

  return (
    <div className="flex flex-col">
      <p className="self-center mb-[40px] text-2xl font-bold">{t("like")}:</p>
      <div className="w-full mo:h-[70px] sm:h-[70px] md:h-[120px] lg:h-[200px] overflow-x-hidden">
        <ul className="flex whitespace-nowrap animate-slider will-change-transform w-[200%] hover:pause">
          {allGoods.length > 0 &&
            allGoods
              .filter((item: GoodProps) => item._id !== good._id)
              .map((good: GoodProps) => (
                <li key={good._id} className="mr-4">
                  <Link href={`/good/${good._id}`}>
                    <CldImage
                      src={good.photoURL}
                      alt="good"
                      width={200}
                      height={200}
                      crop="fill"
                      gravity="auto"
                    />
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
