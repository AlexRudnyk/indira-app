"use client";

import { GoodProps } from "@/types";
import { useGlobalContext } from "@/app/context/store";
import { CartItem, CustomBtn, OrderModal } from ".";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/redux/store";
import axios from "axios";

interface GoodInfoProps {
  title: string;
  price: number;
  count: number;
}

const CartList = ({ allGoods }: { allGoods: GoodProps[] }) => {
  const { cart, setCart } = useGlobalContext();
  const [goodsArray, setGoodsArray] = useState<GoodProps[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);

  let totalSumArr: number[] = [];
  let goodInfo: { title: string; price: number; count: number }[] = [];

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
      const { data } = await axios.post(
        "https://indira-backend.vercel.app/api/users/order",
        mailBody
      );
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
      <ul className="mb-20">
        {goodsArray.map((good: GoodProps) => (
          <CartItem
            key={good._id}
            good={good}
            getTotalSum={getTotalSum}
            goodInfo={getGoodInfo}
          />
        ))}
      </ul>
      <div className="flex justify-center items-center">
        <p className="text-xl mr-6 flex justify-center items-baseline">
          Your order total Sum is:
          <span className="text-3xl font-bold px-4 inline-block w-[100px] text-center">
            {totalSum}
          </span>
          UAH
        </p>
        <CustomBtn
          btnType="button"
          title="Make order"
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
