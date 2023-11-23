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
}

const GlobalContext = createContext<ContextProps>({
  cart: [],
  setCart: (): string[] => [],
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialState: string[] = [];
  const [cart, setCart] = useState<string[]>(initialState);

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
    <GlobalContext.Provider value={{ cart, setCart }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
