export const categories = [
  "Овочі",
  "Крупи",
  "Фрукти",
  "Молочні продукти",
  "М'ясо та риба",
  "Заморожені",
  "Напої",
  "Соуси, приправи",
  "М’ясо",
  "Зернові",
] as const;

export type Category = (typeof categories)[number];

export interface FoodProduct {
  id: string;
  name: string;
  category: Category;
  description: string;
  img: string;

  price: number;
  discountPercentage?: number;
  discountEndDate?: string; // should work on it in future

  weight: string;
  tags?: string[];
  available: boolean; // is in the shop
  isNew?: boolean;
  isRecommended?: boolean;

  rating?: number;
  ratingCount?: number;
  userRating?: number; // current user Rating

  nutritionFacts?: Record<string, number>;
  generalInfo?: Record<string, string>;
  createdAt?: string | null;
}

export interface ProductState {
  products: FoodProduct[];
  loading: boolean;
  error: string | null;
  selectedProduct: FoodProduct | null;
}
