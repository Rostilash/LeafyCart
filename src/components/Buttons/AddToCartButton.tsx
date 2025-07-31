import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/reduxTypeHook";
import { addToCart } from "../../redux/slices/cartSlice";
import type { FoodProduct } from "../../types/productTypes";
import type { CartItem } from "../../types/cartTypes";
import { mapFoodProductToCartItem } from "../../utils/mapFoodToCartItem";

export const AddToCartButton = ({ product }: { product: FoodProduct }) => {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (product: CartItem) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
    setAdded(true);
  };

  useEffect(() => {
    if (added) {
      const timer = setTimeout(() => setAdded(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [added]);

  return (
    <button
      className={`btn-primary-sm btn_hover transition cursor-pointer mt-4 ml-auto 
        ${added ? "bg-green-500 text-white" : ""}`}
      onClick={() => handleAddToCart(mapFoodProductToCartItem(product))}
    >
      {added ? "✔ Додано" : "Додати до кошику"}
    </button>
  );
};
