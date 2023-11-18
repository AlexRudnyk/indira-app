import { fetchGoods } from "@/utils";
import { GoodProps } from "@/types";
import { GoodCard } from "@/components";
import { refreshUser } from "@/actions";

export default async function Home() {
  const allGoods = await fetchGoods();
  // refreshUser();

  return (
    <main>
      <ul className="w-[1280px] ml-auto mr-auto p-5 grid grid-cols-3 gap-9 mt-[96px]">
        {allGoods &&
          allGoods.map((good: GoodProps) => (
            <GoodCard key={good._id} good={good} />
          ))}
      </ul>
    </main>
  );
}
