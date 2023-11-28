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

export interface AddGoodProps {
  title: string;
  text: string;
  description: string;
  photoURL: string;
  price: number;
}

export interface EditGoodProps {
  title?: string;
  text?: string;
  description?: string;
  price?: number;
}
export interface AuthState {
  user: {
    _id: null | string;
    name: null | string;
    email: null | string;
    phone: null | string;
    role: null | string;
    goodsInCart: GoodProps[];
  };
  accessToken: null | string;
  refreshToken: null | string;

  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: any | boolean;
}

export interface CommentProps {
  _id?: string;
  userName?: string;
  text: string;
  good?: string;
  createdAt?: string;
  updatedAt?: string;
}
