"use client";

import { logout } from "@/actions";
import { CustomBtn } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { logoutState } from "@/redux/auth/slice";
import { RootState } from "@/redux/store";

const UserNav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <p className="mr-8 text-lg">Hello, {user.name}</p>
      <CustomBtn
        title="SignOut"
        btnType="button"
        containerStyles="bg-[var(--primary)] text-white rounded-2xl mr-3"
        handleClick={async () => {
          await logout();
          dispatch(logoutState());
        }}
      />
      <CustomBtn
        title="Cart"
        btnType="button"
        containerStyles="bg-[var(--primary)] text-white rounded-2xl"
      />
    </>
  );
};

export default UserNav;
