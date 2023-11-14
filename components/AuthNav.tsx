import { CustomBtn } from ".";

const AuthNav = () => {
  return (
    <>
      <CustomBtn
        title="SignIn"
        btnType="button"
        containerStyles="bg-[var(--primary)] text-white rounded-2xl mr-3"
      />
      <CustomBtn
        title="SignUp"
        btnType="button"
        containerStyles="bg-[var(--primary)] text-white rounded-2xl mr-3"
      />
      <CustomBtn
        title="Cart"
        btnType="button"
        containerStyles="bg-[var(--primary)] text-white rounded-2xl"
      />
    </>
  );
};

export default AuthNav;
