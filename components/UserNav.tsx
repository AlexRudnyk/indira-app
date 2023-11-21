"use client";

import { CustomBtn } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/auth/operations";

const UserNav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <p className="mr-8 text-lg">Hello, {user.name}</p>
      <CustomBtn
        title="SignOut"
        btnType="button"
        containerStyles="bg-[var(--primary)] text-white rounded-2xl mr-3"
        handleClick={async () => {
          dispatch(logout());
        }}
      />
    </>
  );
};

export default UserNav;
