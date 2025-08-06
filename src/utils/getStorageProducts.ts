import type { FoodProduct } from "../types/productTypes";

const STORAGE_KEY = "recentProducts";

export const getRecentProducts = (): FoodProduct[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};
