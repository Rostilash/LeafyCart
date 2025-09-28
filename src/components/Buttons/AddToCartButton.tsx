import { useState, useEffect } from "react";
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
  const [added, setAdded] = useState(false);
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();

  const handleAddToCart = (product: CartItem) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
    setAdded(true);
    showSnackbar(`Ви додали до кошику - ${product.name}! `, "success");
  };

  useEffect(() => {
    if (added) {
      const timer = setTimeout(() => setAdded(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [added]);

  return (
    <>
      <button
        className="absolute bottom-1 right-1 sm:bottom-4 sm:right-4 
      btn-primary-sm btn_hover transition md:mt-4 md:ml-auto
      "
        onClick={() => handleAddToCart(mapFoodProductToCartItem(product))}
        disabled={added}
      >
        {added ? (
          <Check size={20} />
        ) : (
          <span className="text-[var(--leafy-white)]">
            <span className="hidden md:block ">Додати до кошику</span>
            {added ? <Check size={20} className="md:hidden block" /> : <PackagePlus size={20} className="md:hidden block" />}
          </span>
        )}
      </button>
      <AppSnackbar open={open} message={message} severity={severity} onClose={handleClose} />
    </>
  );
};
