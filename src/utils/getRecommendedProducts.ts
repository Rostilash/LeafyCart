import { useMemo } from "react";
import type { FoodProduct } from "../types/productTypes";

export const getRecommendedProducts = (product: FoodProduct, allProducts: FoodProduct[]) =>
  useMemo(() => {
    const keywords = product.name.toLowerCase().split(" ");
    const byKeywords = allProducts.filter((p) => p.id !== product.id && keywords.some((k) => p.name.toLowerCase().includes(k))).slice(0, 5);

    const byCategory = allProducts
      .filter((p) => p.id !== product.id && p.category === product.category)
      .sort((a, b) => (a.available === b.available ? 0 : a.available ? -1 : 1))
      .slice(0, 5);

    return byKeywords.length > 0 ? byKeywords : byCategory;
  }, [product, allProducts]);
