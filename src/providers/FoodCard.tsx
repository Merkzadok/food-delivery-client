"use client";

import { AddToCartType, FoodType } from "@/lib/types/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useContext,
} from "react";

export type FoodWithQuantity = {
  food: FoodType;
  quantity: number;
  totalPrice: number;
};

type FoodCartContextType = {
  foodCart: {
    foodName: string;
    price: number;
    quantity: number;
    _id: string;
  }[];
  setFoodCart: Dispatch<
    SetStateAction<
      {
        foodName: string;
        price: number;
        quantity: number;
      }[]
    >
  >;
  removeFromCart: (foodId: string) => void;
  addToCart: (food: AddToCartType) => void;
};
export const FoodCartContext = createContext<FoodCartContextType>(
  {} as FoodCartContextType
);

export default function FoodCartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [foodCart, setFoodCart] = useState<
    { foodName: string; price: number; quantity: number }[]
  >([]);

  const addToCart = (newFood: FoodWithQuantity) => {
    console.log("Adding to cart:", newFood);

    const existingFood = foodCart.find(
      ({ food }) => food._id === newFood.food._id
    );

    if (existingFood) {
      const updatedFoodCart = updateFoodCart(foodCart, newFood);

      setFoodCart(updatedFoodCart);
      return;
    }

    setFoodCart([...foodCart, newFood]);
  };

  const updateFoodCart = (foodCart, newFood) => {
    const updatedFoodCart = foodCart.map(({ food, quantity, totalPrice }) => {
      if (food._id === food._id) {
        return {
          food: food,
          quantity: quantity + newFood.quantity,
          totalPrice: quantity * Number(food.price),
        };
      } else {
        return {
          food,
          quantity,
          totalPrice,
        };
      }
    });

    return updatedFoodCart;
  };
  // increment decrement
  const incrementFoodQuantity = (foodId: string) => {
    const updatedFoodCart = foodCart.map(({ food, quantity, totalPrice }) => {
      if (food._id === foodId) {
        return {
          food: food,
          quantity: quantity + 1,
          totalPrice: quantity * Number(food.price),
        };
      } else {
        return {
          food,
          quantity,
          totalPrice,
        };
      }
    });

    setFoodCart(updatedFoodCart);
  };

  const decrimentFoodQuantity = (foodId: string) => {
    const updatedFoodCart = foodCart.map(({ food, quantity, totalPrice }) => {
      if (food._id === foodId) {
        return {
          food: food,
          quantity: quantity < 2 ? 1 : quantity - 1,
          totalPrice: (quantity - 1) * food.price,
        };
      } else {
        return {
          food,
          quantity,
          totalPrice,
        };
      }
    });

    setFoodCart(updatedFoodCart);
  };

  const removeFromFoodCart = (foodId: string) => {
    console.log(foodId, foodCart);
    const deleteUpdatedFood = foodCart.filter(
      (item) => item.food._id !== foodId
    );
    console.log(deleteUpdatedFood);

    setFoodCart(deleteUpdatedFood);
  };

  // ending of inc dec
  useEffect(() => {
    const cartItems = localStorage.getItem("foodCart");

    if (cartItems) setFoodCart(JSON.parse(cartItems) || []);
  }, []);

  useEffect(() => {
    if (foodCart) localStorage.setItem("foodCart", JSON.stringify(foodCart));
  }, [foodCart]);

  return (
    <FoodCartContext.Provider
      value={{
        foodCart,
        setFoodCart,
        addToCart,
        removeFromFoodCart,
        incrementFoodQuantity,
        decrimentFoodQuantity,
      }}
    >
      {children}
    </FoodCartContext.Provider>
  );
}
export const useFoodCart = () => useContext(FoodCartContext);
