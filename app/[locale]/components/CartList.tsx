"use client";

import { GoodProps } from "@/types";
import { CartItem, CustomBtn, OrderModal } from ".";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { useGlobalContext } from "../context/store";
import { useTranslations } from "next-intl";
import { getAllGoods } from "@/redux/goods/operations";

interface GoodInfoProps {
  title: string;
  price: number;
  count: number;
}

const CartList = () => {
  const { cart, setCart } = useGlobalContext();
  const [goodsArray, setGoodsArray] = useState<GoodProps[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const allGoods = useSelector((state: RootState) => state.goods.goods);
  const t = useTranslations("cartList");
  const dispatch = useDispatch<AppDispatch>();

  let totalSumArr: number[] = [];
  let goodInfo: { title: string; price: number; count: number }[] = [];

  useEffect(() => {
    dispatch(getAllGoods());
  }, [dispatch]);

  useEffect(() => {
    const foundGoods = cart
      .map((goodId: string) => allGoods.find((good) => good?._id === goodId))
      .filter((good): good is GoodProps => !!good);

    setGoodsArray(foundGoods);
  }, [allGoods, cart]);

  const getGoodInfo = ({ title, price, count }: GoodInfoProps): void => {
    goodInfo.push({ title, price, count });
  };

  const getTotalSum = (sum: number): void => {
    totalSumArr.push(sum);
    const totalSumRes = totalSumArr.reduce((acc, sum) => acc + sum, 0);
    setTotalSum(totalSumRes);
  };

  const handleOrderModalClose = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOrderSubmit = async ({
    name,
    phone,
    email,
  }: {
    name: string;
    phone: string;
    email: string;
  }) => {
    const mailBody = {
      name,
      phone,
      email,
      goods: JSON.stringify(goodInfo),
      totalSum,
    };

    try {
      axios.post("https://indira-backend.vercel.app/api/users/order", mailBody);
      localStorage.removeItem("cart");
      setCart([]);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleMakeOrder = (): void => {
    if (isLoggedIn && user.name && user.phone && user.email) {
      handleOrderSubmit({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
    } else {
      setIsModalOpen(!isModalOpen);
    }
  };

  return cart.length ? (
    <>
      <ul className="mb-20 mt-[140px]">
        {goodsArray.map((good: GoodProps) => (
          <CartItem
            key={good._id}
            good={good}
            getTotalSum={getTotalSum}
            goodInfo={getGoodInfo}
          />
        ))}
      </ul>
      <div className="flex flex-col md:flex-row justify-center items-center pb-10">
        <p className="text-xl md:mr-6 flex justify-center items-baseline mb-6 md:mb-0">
          {t("totalSum")}:
          <span className="text-3xl font-bold px-4 inline-block w-[100px] text-center">
            {totalSum}
          </span>
          {t("currency")}
        </p>
        <CustomBtn
          btnType="button"
          title={t("makeOrder")}
          containerStyles="bg-[var(--primary)] text-white rounded-2xl mr-3"
          handleClick={handleMakeOrder}
        />
      </div>
      {isModalOpen && (
        <OrderModal
          onCloseModal={handleOrderModalClose}
          onOrderSubmit={handleOrderSubmit}
        />
      )}
    </>
  ) : (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <p className="font-bold text-4xl md:text-5xl mb-28">{t("cartEmpty")}</p>
      <Link href="/">
        <CustomBtn
          btnType="button"
          title={t("goShopping")}
          containerStyles="bg-[var(--primary)] text-white rounded-2xl mr-3"
        />
      </Link>
    </div>
  );
};

export default CartList;
