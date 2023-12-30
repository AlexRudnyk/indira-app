"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "@/redux/auth/operations";
import { AppDispatch, RootState } from "@/redux/store";
import { Loader } from ".";

function ReduxWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isRefreshing = useSelector(
    (state: RootState) => state.auth.isRefreshing
  );

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch, user._id]);

  return isRefreshing ? <Loader /> : <div>{children}</div>;
}

export default ReduxWrapper;
