"use client";

import { CustomBtn } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/auth/operations";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface UserNavProps {
  closeAfterClick?: () => void;
  isBurgerMenuOpen?: boolean;
}

const UserNav = ({ closeAfterClick, isBurgerMenuOpen }: UserNavProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const t = useTranslations("userNav");

  return (
    <>
      <p className="mr-8 text-lg mo:hidden sm:hidden md:block">
        {t("hello")}, {user.name}
      </p>
      <CustomBtn
        title={t("signout")}
        btnType="button"
        containerStyles="bg-[var(--primary)] text-white rounded-2xl md:mr-3 mo:mb-5 sm:mb-5 md:mb-0 mo:w-[100px] sm:w-[100px]"
        handleClick={() => {
          if (isBurgerMenuOpen && closeAfterClick) {
            dispatch(logout());
            closeAfterClick();
          } else {
            dispatch(logout());
          }
        }}
      />
      {user.role === "admin" && (
        <Link href="/admin" className="md:hidden">
          <CustomBtn
            title="Admin"
            btnType="button"
            containerStyles="bg-[var(--primary)] text-white rounded-2xl w-[100px]"
            handleClick={() => {
              if (closeAfterClick) closeAfterClick();
            }}
          />
        </Link>
      )}
    </>
  );
};

export default UserNav;
