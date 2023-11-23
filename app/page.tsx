import { fetchGoods } from "@/utils";
import { GoodCard } from "@/components";
import { GoodProps } from "@/types";

export default async function Home() {
  const allGoods: GoodProps[] = await fetchGoods();

  return (
    <main>
      <ul className="w-[1280px] ml-auto mr-auto p-5 grid grid-cols-3 gap-9 mt-[96px]">
        {allGoods.length > 0 &&
          allGoods.map((good: GoodProps) => (
            <GoodCard key={good._id} good={good} />
          ))}
      </ul>
    </main>
  );
}
