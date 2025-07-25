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
  foodCart: FoodWithQuantity[];
  setFoodCart: Dispatch<SetStateAction<FoodWithQuantity[]>>;
  addToCart: (food: AddToCartType) => void;
  removeFromFoodCart: (foodId: string) => void;
  incrementFoodQuantity: (foodId: string) => void;
  decrimentFoodQuantity: (foodId: string) => void;
};
export const FoodCartContext = createContext<FoodCartContextType>(
  {} as FoodCartContextType
);

export default function FoodCartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [foodCart, setFoodCart] = useState<FoodWithQuantity[]>([]);
  const addToCart = (food: AddToCartType) => {
    const newFoodWithQuantity: FoodWithQuantity = {
      food: food.food,
      quantity: food.quantity,
      totalPrice: food.quantity * Number(food.food.price),
    };

    console.log("Adding to cart:", newFoodWithQuantity);

    const existingFood = foodCart.find(
      ({ food }) => food._id === newFoodWithQuantity.food._id
    );

    if (existingFood) {
      const updatedFoodCart = updateFoodCart(foodCart, newFoodWithQuantity);

      setFoodCart(updatedFoodCart);
      return;
    }

    setFoodCart([...foodCart, newFoodWithQuantity]);
  };
  //aaaa
  const updateFoodCart = (
    foodCart: FoodWithQuantity[],
    newFood: FoodWithQuantity
  ) => {
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
  //aaaaaa
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
