import { fetchGoods } from "@/utils";
import { GoodProps } from "@/types";
import { GoodCard } from "@/components";

export default async function Home() {
  const allGoods = await fetchGoods();

  return (
    <main>
      <ul className="w-[1280px] ml-auto mr-auto p-5">
        {allGoods &&
          allGoods.map((good: GoodProps) => (
            <GoodCard key={good._id} good={good} />
          ))}
      </ul>
    </main>
  );
}
