import { useEffect } from "react";
import type { FoodProduct } from "../types/productTypes";
import { useAppSelector } from "../redux/reduxTypeHook";

const STORAGE_KEY = "recentProducts";
const MAX_RECENT = 7;

export const useRecentProducts = () => {
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

  useEffect(() => {
    if (!selectedProduct) return;

    let recentProducts: FoodProduct[] = [];

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        recentProducts = JSON.parse(saved);
      }
    } catch (error) {
      console.warn("Could not parse recent products from localStorage", error);
    }

    recentProducts = recentProducts.filter((p) => p.id !== selectedProduct.id);
    recentProducts.unshift(selectedProduct);

    if (recentProducts.length > MAX_RECENT) {
      recentProducts = recentProducts.slice(0, MAX_RECENT);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentProducts));
  }, [selectedProduct]);
};
