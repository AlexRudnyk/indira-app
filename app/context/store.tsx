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
}

const GlobalContext = createContext<ContextProps>({
  cart: [],
  setCart: (): void => {},
  handleDeleteFromCart: (): void => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialState: string[] = [];
  const [cart, setCart] = useState<string[]>(initialState);

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
    <GlobalContext.Provider value={{ cart, setCart, handleDeleteFromCart }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
