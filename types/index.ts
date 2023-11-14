import { MouseEventHandler } from "react";

export interface CustomBtnProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  isDisabled?: boolean;
}

export interface GoodProps {
  _id: string;
  title: string;
  text: string;
  description: string;
  photoURL: string;
  price: number;
}
