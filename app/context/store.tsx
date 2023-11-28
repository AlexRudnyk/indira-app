"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

interface ContextProps {
  cart: string[];
  setCart: Dispatch<SetStateAction<string[]>>;
  handleDeleteFromCart: (id: string) => void;
  isCommentOpen: boolean;
  setIsCommentOpen: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  cart: [],
  setCart: (): void => {},
  handleDeleteFromCart: (): void => {},
  isCommentOpen: false,
  setIsCommentOpen: (): void => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialState: string[] = [];
  const [cart, setCart] = useState<string[]>(initialState);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const handleDeleteFromCart = (id: string): void => {
    const filteredCart = cart.filter((item: string) => item !== id);
    setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  };

  useEffect(() => {
    const storedCartData = localStorage.getItem("cart");

    if (storedCartData) {
      try {
        const cartData = JSON.parse(storedCartData);
        setCart(cartData);
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        handleDeleteFromCart,
        isCommentOpen,
        setIsCommentOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
