import { GoodProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface GoodCardProps {
  good: GoodProps;
}

const GoodCard = ({ good }: GoodCardProps) => {
  return (
    <li className="mo:max-w=[440px] sm:w-[440px] md:w-[350px] lg:w-[400px] rounded-2xl shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] ">
      <Link
        href={`/good/${good._id}`}
        className="flex flex-col justify-between h-full"
      >
        <div>
          <div className="rounded-t-2xl overflow-hidden">
            <Image
              src={good.photoURL}
              alt="good"
              width={400}
              height={400}
              className="rounded-t-2xl transition ease-in-out hover:scale-105 duration-300 w-full"
            />
          </div>
          <div className="p-2">
            <p className="font-bold text-lg mb-4">{good.title}</p>
            <p className="">{good.text}</p>
          </div>
        </div>
        <p className="p-2">{good.price} UAH</p>
      </Link>
    </li>
  );
};

export default GoodCard;
