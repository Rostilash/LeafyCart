import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../redux/reduxTypeHook";
import { addToCart } from "../../redux/slices/cartSlice";
import { mapFoodProductToCartItem } from "../../types/mapFoodToCartItem";
import { Check, PackagePlus } from "lucide-react";
import { useSnackbar } from "../../hook/useSnackbarReturn";
import { AppSnackbar } from "../AppSnackbar";
import type { FoodProduct } from "../../types/productTypes";
import type { CartItem } from "../../types/cartTypes";

export const AddToCartButton = ({ product }: { product: FoodProduct }) => {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();
  const addedKey = added > 0;

  const handleAddToCart = (product: CartItem) => {
    dispatch(addToCart({ ...product, quantity: 1 }));

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setAdded((prev) => prev + 1);
    showSnackbar(`Ви додали до кошику - ${product.name}!`, "success");

    timerRef.current = setTimeout(() => {
      setAdded(0);
      timerRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <button
        className="absolute bottom-1 right-1 sm:bottom-4 sm:right-4 
        btn-primary-sm btn_hover transition md:mt-4 md:ml-auto"
        onClick={() => handleAddToCart(mapFoodProductToCartItem(product))}
        disabled={addedKey}
      >
        {addedKey ? (
          <Check size={20} />
        ) : (
          <span className="text-[var(--leafy-white)]">
            <span className="hidden md:block">Додати до кошику</span>
            <PackagePlus size={20} className="md:hidden block" />
          </span>
        )}
      </button>

      <AppSnackbar open={open} message={message} severity={severity} onClose={handleClose} />
    </>
  );
};
