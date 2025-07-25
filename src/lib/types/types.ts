export type categoryNameType = {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
};
export type FoodType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  createdAt: string;
  updatedAt: string;
  quantity: number;
};
export type foodWithCategoryType = {
  _id: string;
  categoryName: string;
  foods: FoodType[];
};

export type AddToCartType = {
  food: FoodType;
  quantity: number;
};
