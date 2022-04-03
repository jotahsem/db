import React, { useState } from "react";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const CartContext = React.createContext({});

const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems }}
    ></CartContext.Provider>
  );
};

export default CartProvider;
