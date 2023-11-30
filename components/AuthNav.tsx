import Link from "next/link";
import { CustomBtn } from ".";

const AuthNav = ({ closeAfterClick }: { closeAfterClick?: () => void }) => {
  return (
    <>
      <Link href="/login">
        <CustomBtn
          title="SignIn"
          btnType="button"
          containerStyles="bg-[var(--primary)] text-white rounded-2xl mo:mb-5 sm:mb-5 md:mb-0 md:mr-3 mo:w-[100px] sm:w-[100px]"
          handleClick={closeAfterClick}
        />
      </Link>
      <Link href="/register">
        <CustomBtn
          title="SignUp"
          btnType="button"
          containerStyles="bg-[var(--primary)] text-white rounded-2xl md:mr-3 mo:w-[100px] sm:w-[100px]"
          handleClick={closeAfterClick}
        />
      </Link>
    </>
  );
};

export default AuthNav;
