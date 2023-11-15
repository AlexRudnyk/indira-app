import { GoodProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface GoodCardProps {
  good: GoodProps;
}

const GoodCard = ({ good }: GoodCardProps) => {
  return (
    <li className="w-[400px] rounded-2xl shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] overflow-hidden">
      <Link href="/" className="flex flex-col justify-between h-full">
        <div>
          <Image
            src={good.photoURL}
            alt="good"
            width={400}
            height={400}
            className="rounded-t-2xl transition ease-in-out hover:scale-105"
          />
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

// <li className="flex flex-col justify-between w-[400px] rounded-2xl shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)]">
//   <div>
//     <Image
//       src={good.photoURL}
//       alt="good"
//       width={400}
//       height={400}
//       className="rounded-t-2xl"
//     />
//     <div className="p-2">
//       <p className="font-bold text-lg mb-4">{good.title}</p>
//       <p className="">{good.text}</p>
//     </div>
//   </div>
//   <p className="p-2">{good.price} UAH</p>
// </li>;
