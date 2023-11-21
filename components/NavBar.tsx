"use client";

import { Great_Vibes } from "next/font/google";
import Mandala from "../public/mandala.png";
import Image from "next/image";
import { AuthNav, CustomBtn, UserNav } from "../components";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const great_vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const NavBar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <header className="shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] fixed top-0 left-0 w-screen bg-white z-10">
      <div className="flex items-center ml-auto mr-auto w-[1280px] h-[96px] p-5 relative justify-between">
        <Link href="/">
          <span
            className={`${great_vibes.className} text-5xl text-[var(--primary)]`}
          >
            Indira
          </span>
          <Image
            src={Mandala}
            alt="logo"
            width={80}
            className="absolute top-[5px] left-[5px] -z-10 opacity-60"
          />
        </Link>
        <nav className="flex items-center">
          {isLoggedIn ? <UserNav /> : <AuthNav />}
          <Link href="/cart">
            <CustomBtn
              title="Cart"
              btnType="button"
              containerStyles="bg-[var(--primary)] text-white rounded-2xl"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
