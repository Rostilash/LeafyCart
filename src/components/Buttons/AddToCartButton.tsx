import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/reduxTypeHook";
import { addToCart } from "../../redux/slices/cartSlice";
import type { FoodProduct } from "../../types/productTypes";
import type { CartItem } from "../../types/cartTypes";
import { mapFoodProductToCartItem } from "../../utils/mapFoodToCartItem";
import { PackagePlus } from "lucide-react";

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
      className="absolute bottom-4 right-4 btn-primary-sm btn_hover transition cursor-pointer md:mt-4 md:ml-auto"
      onClick={() => handleAddToCart(mapFoodProductToCartItem(product))}
    >
      {added ? (
        "Додано"
      ) : (
        <span className="text-[var(--leafy-white)]">
          <span className="hidden md:block ">{added ? "Додано" : "Додати до кошику"}</span>
          <PackagePlus className="md:hidden block" />
        </span>
      )}
    </button>
  );
};
