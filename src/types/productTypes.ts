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
  "Готові страви",
] as const;

export type Category = (typeof categories)[number];

export interface FoodProduct {
  id: number;
  name: string;
  category: Category;
  description: string;
  price: number;
  img: string;
  weight: string;
  tags?: string[];
  available: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
  nutritionFacts?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

export interface ProductState {
  products: FoodProduct[];
  loading: boolean;
  error: boolean | null;
  selectedProduct: FoodProduct | null;
}
