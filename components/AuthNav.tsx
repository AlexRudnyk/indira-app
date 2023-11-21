import Link from "next/link";
import { CustomBtn } from ".";

const AuthNav = () => {
  return (
    <>
      <Link href="/login">
        <CustomBtn
          title="SignIn"
          btnType="button"
          containerStyles="bg-[var(--primary)] text-white rounded-2xl mr-3"
        />
      </Link>
      <Link href="/register">
        <CustomBtn
          title="SignUp"
          btnType="button"
          containerStyles="bg-[var(--primary)] text-white rounded-2xl mr-3"
        />
      </Link>
    </>
  );
};

export default AuthNav;
