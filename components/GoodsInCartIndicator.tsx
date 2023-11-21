import { useGlobalContext } from "@/app/context/store";

const GoodsInCartIndicator = () => {
  const { cart } = useGlobalContext();

  return (
    <div className="absolute top-[-10px] right-[-10px] w-[25px] h-[25px] rounded-full bg-red-600 flex justify-center items-center">
      <span className="text-white font-bold">{cart?.length}</span>
    </div>
  );
};

export default GoodsInCartIndicator;
