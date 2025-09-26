import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypeHook";
import type { FoodProduct } from "../types/productTypes";
import { fetchUserRating, rateProduct } from "../redux/slices/productSlice";

export const useProductRating = (product: FoodProduct, userId?: string) => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);
  const [newProduct, setNewProduct] = useState<FoodProduct | null>(null);

  const handleRateProduct = (userRating: number) => {
    if (!product || !userId) return;

    const newCount = (product.ratingCount || 0) + 1;
    const newAverage = ((product.rating || 0) * (product.ratingCount || 0) + userRating) / newCount;

    setNewProduct((prev) => ({
      ...(prev || product),
      rating: newAverage,
      ratingCount: newCount,
      userRating,
    }));

    dispatch(rateProduct({ productId: product.id, rating: userRating, userId }));
  };

  useEffect(() => {
    if (product && userId) {
      fetchUserRating(userId, product.id).then((rating) => {
        setNewProduct({ ...product, userRating: rating || 0 });
      });
    }
  }, [product, userId]);

  return { productToShow: newProduct || selectedProduct || product, handleRateProduct };
};
