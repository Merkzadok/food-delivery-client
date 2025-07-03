export type categoryNameType = {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
};
export type foods = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};
export type foodWithCategory = {
  _id: string;
  categoryName: string;
  foods: foods[];
};
