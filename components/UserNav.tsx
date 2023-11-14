import { CustomBtn } from ".";

const UserNav = () => {
  return (
    <>
      <p className="mr-8 text-lg">Hello, Alexander</p>
      <CustomBtn
        title="SignOut"
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

export default UserNav;
