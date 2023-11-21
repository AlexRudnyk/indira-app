import React from "react";

const GoodsInCartIndicator = () => {
  return (
    <div className="absolute top-[-10px] right-[-10px] w-[25px] h-[25px] rounded-full bg-red-600 flex justify-center items-center">
      <span className="text-white font-bold">3</span>
    </div>
  );
};

export default GoodsInCartIndicator;
