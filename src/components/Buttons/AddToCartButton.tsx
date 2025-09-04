import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/reduxTypeHook";
import { addToCart } from "../../redux/slices/cartSlice";
import type { FoodProduct } from "../../types/productTypes";
import type { CartItem } from "../../types/cartTypes";
import { mapFoodProductToCartItem } from "../../utils/mapFoodToCartItem";
import { Check, PackagePlus } from "lucide-react";
import { Snackbar, Alert } from "@mui/material";

export const AddToCartButton = ({ product }: { product: FoodProduct }) => {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleAddToCart = (product: CartItem) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
    setOpen(true);
    setAdded(true);
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
      >
        {added ? (
          <Check size={20} />
        ) : (
          <span className="text-[var(--leafy-white)]">
            <span className="hidden md:block ">
              <PackagePlus size={26} />
            </span>
            {added ? <Check size={20} className="md:hidden block" /> : <PackagePlus size={20} className="md:hidden block" />}
          </span>
        )}
      </button>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          ✅ Ви додали до кошику - {product.name}!
        </Alert>
      </Snackbar>
    </>
  );
};
