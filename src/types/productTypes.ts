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
  price: number;
  discountPercentage?: number;
  discountEndDate?: string;
  img: string;
  weight: string;
  tags?: string[];
  available: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
  createdAt?: string | null;
  nutritionFacts?: {
    calories?: number;
    protein?: number;
    fat?: number;
    carbs?: number;
  };
}

export interface ProductState {
  products: FoodProduct[];
  loading: boolean;
  error: string | null;
  selectedProduct: FoodProduct | null;
}
