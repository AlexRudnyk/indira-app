"use client";

import { Great_Vibes } from "next/font/google";
import Mandala from "../../../public/mandala.png";
import Image from "next/image";
import {
  AuthNav,
  CustomBtn,
  GoodsInCartIndicator,
  UserNav,
} from "../components";
import { Link } from "@/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslations } from "next-intl";

const great_vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const NavBar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
  const t = useTranslations("navBar");

  const handleBurgerMenuToggle = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <header className="shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] fixed top-0 left-0 w-screen bg-white z-10">
      <div className="flex items-center mx-auto mo:max-w-[480px] sm:w-[480px] md:w-[768px] lg:w-[1280px] h-[96px] p-5 relative justify-between">
        <Link href="/">
          <span
            className={`${great_vibes.className} text-5xl mo:text-4xl text-[var(--primary)]`}
          >
            Indira
          </span>
          <Image
            src={Mandala}
            alt="logo"
            width={80}
            className="absolute top-[5px] mo:top-[10px] left-[5px] -z-10 opacity-60 mo:w-[60px]"
          />
        </Link>
        <div className="flex">
          <Link href="/" locale="uk" className="mr-7">
            UK
          </Link>
          <Link href="/" locale="en">
            EN
          </Link>
        </div>
        <nav className="hidden md:flex items-center">
          {isLoggedIn ? <UserNav /> : <AuthNav />}
          {user.role === "admin" ? (
            <Link href="/admin">
              <CustomBtn
                title="Admin"
                btnType="button"
                containerStyles="bg-[var(--primary)] text-white rounded-2xl"
              />
            </Link>
          ) : (
            <Link href="/cart" className="relative ">
              <CustomBtn
                title={t("cartBtn")}
                btnType="button"
                containerStyles="bg-[var(--primary)] text-white rounded-2xl"
              />
              <GoodsInCartIndicator />
            </Link>
          )}
        </nav>
        <div className="flex items-center md:hidden">
          {isLoggedIn && <p className="mr-4">Hello, {user.name}</p>}
          {user.role !== "admin" && (
            <Link href="/cart" className="relative mr-4">
              <CustomBtn
                title={t("cartBtn")}
                btnType="button"
                containerStyles="bg-[var(--primary)] text-white rounded-2xl"
              />
              <GoodsInCartIndicator />
            </Link>
          )}
          <button
            type="button"
            className="p-2"
            onClick={handleBurgerMenuToggle}
          >
            <GiHamburgerMenu size={30} />
          </button>
          {isBurgerMenuOpen && (
            <div className="fixed top-0 left-0 flex flex-col justify-center items-center bg-white w-screen p-10">
              <button
                type="button"
                className="absolute top-[10px] right-[10px] p-4 rounded-full z-10"
                onClick={handleBurgerMenuToggle}
              >
                <AiOutlineClose />
              </button>
              <Link href="/">
                <CustomBtn
                  btnType="button"
                  title="Home"
                  containerStyles="bg-[var(--primary)] text-white rounded-2xl mb-5 w-[100px]"
                  handleClick={handleBurgerMenuToggle}
                />
              </Link>
              {isLoggedIn ? (
                <UserNav
                  closeAfterClick={handleBurgerMenuToggle}
                  isBurgerMenuOpen={isBurgerMenuOpen}
                />
              ) : (
                <AuthNav closeAfterClick={handleBurgerMenuToggle} />
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
