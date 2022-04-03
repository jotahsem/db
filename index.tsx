import React, { useState } from "react";
import { useQuery } from "react-query";
import Head from "next/head";

import CourseItem from "../components/pages/home/products/courses/item/item";
import Cart from "../components/pattern/cart/cart";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const Home: React.FC = () => {
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) => {
    items.reduce((ack: number, item) => ack + item.amount, 0);
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. O produto já está adicionado ao carrinho?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // 2 . Então o produto é adicionado pela primeira vez
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <div>carregando</div>;

  if (error) return <div>falha ao carregar produtos</div>;

  return (
    <div>
      <Head>
        <title>Pensar Store</title>
      </Head>
      <Cart
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
      />
      <button>carrinho {getTotalItems(cartItems)}</button>
      {data?.map((item, index) => (
        <CourseItem
          item={item}
          key={index}
          handleAddToCart={handleAddToCart}
        ></CourseItem>
      ))}
    </div>
  );
};

export default Home;
