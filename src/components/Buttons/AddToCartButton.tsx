import { useAppDispatch } from "../../redux/reduxTypeHook";
import { addToCart } from "../../redux/slices/cartSlice";
import type { FoodProduct } from "../../redux/slices/productSlice";
import type { CartItem } from "../../types/cartTypes";
import { mapFoodProductToCartItem } from "../../utils/mapFoodToCartItem";

export const AddToCartButton = ({ product }: { product: FoodProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: CartItem) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };
  return (
    <button
      className="btn-primary-sm  btn_hover transition cursor-pointer mt-4 ml-auto"
      onClick={() => handleAddToCart(mapFoodProductToCartItem(product))}
    >
      Додати до кошику
    </button>
  );
};
