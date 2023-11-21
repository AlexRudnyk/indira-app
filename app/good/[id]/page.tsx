import { fetchSpecificGood } from "@/utils";
import { GoodProps } from "@/types";
import {
  AddToCartBtn,
  GoodCard,
  ReadCommentsBtn,
  WriteCommentBtn,
} from "@/components";
import Image from "next/image";
import Link from "next/link";
import { fetchGoods } from "@/utils";

const Good = async ({ params }: { params: { id: string } }) => {
  const good: GoodProps = await fetchSpecificGood(params.id);
  const allGoods: GoodProps[] = await fetchGoods();

  return (
    <>
      <div className="mt-[120px] w-[1280px] ml-auto mr-auto flex  p-6 rounded-2xl">
        <Image
          src={good.photoURL}
          width={320}
          height={320}
          alt="good"
          className="rounded-2xl mr-8 w-[400px] h-[400px]"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-[30px]">{good.title}</h1>
            <p className="mb-[20px]">{good.text}</p>
            <p className="mb-[20px]">{good.description}</p>
            <p className="mb-[30px]">Price: {good.price} UAH</p>
            <div className="flex mb-[30px] items-center">
              <AddToCartBtn id={params.id} />
              <Link
                href="/"
                className="flex justify-center items-center py-3 px-6 outline-none shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out hover:scale-110 bg-[var(--primary)] text-white rounded-2xl mr-3"
              >
                Back to Home
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <ReadCommentsBtn />
            <WriteCommentBtn />
          </div>
        </div>
      </div>
      <div className="w-[1280px] ml-auto mr-auto p-6 flex flex-col">
        <p className="self-center mb-[40px] text-2xl font-bold">
          You may also like:
        </p>
        <div className="w=full h-[200px] overflow-x-hidden">
          <ul className="flex whitespace-nowrap animate-slider will-change-transform w-[200%] hover:pause">
            {allGoods.length > 0 &&
              allGoods
                .filter((item: GoodProps) => item._id !== good._id)
                .map((good: GoodProps) => (
                  <li key={good._id} className="mr-4">
                    <Link href={`/good/${good._id}`}>
                      <Image
                        src={good.photoURL}
                        alt="good"
                        width={200}
                        height={200}
                      />
                    </Link>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Good;
