import { GoodProps } from "@/types";
import Image from "next/image";

interface GoodCardProps {
  good: GoodProps;
}

const GoodCard = ({ good }: GoodCardProps) => {
  return (
    <li>
      <Image src={good.photoURL} alt="good" width={320} height={320} />
      <div>
        <p>{good.title}</p>
        <p>{good.text}</p>
        <p>{good.price} UAH</p>
      </div>
    </li>
  );
};

export default GoodCard;
