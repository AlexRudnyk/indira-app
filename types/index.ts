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

export interface RegCredentialsProps {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LogCredentialsProps {
  email: string;
  password: string;
}

export interface UserProps {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  goodsInCart: GoodProps[];
}
