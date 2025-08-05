import { useEffect } from "react";
import type { FoodProduct } from "../types/productTypes";
import { useAppSelector } from "../redux/reduxTypeHook";

const STORAGE_KEY = "recentProducts";
const MAX_RECENT = 6;

export const useRecentProducts = () => {
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

  useEffect(() => {
    if (!selectedProduct) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    let recentProducts: FoodProduct[] = saved ? JSON.parse(saved) : [];

    // Remove old version of same product (by id)
    recentProducts = recentProducts.filter((p) => p.id !== selectedProduct.id);

    // Add to beginning
    recentProducts.unshift(selectedProduct);

    // Keep only the first MAX_RECENT
    if (recentProducts.length > MAX_RECENT) {
      recentProducts = recentProducts.slice(0, MAX_RECENT);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentProducts));
  }, [selectedProduct?.id]);
};
