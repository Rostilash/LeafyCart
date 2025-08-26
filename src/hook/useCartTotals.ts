import { useAppSelector } from "../redux/reduxTypeHook";

export const useCartTotals = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalDiscount = cartItems.reduce((acc, item) => {
    if (item.discountPercentage) {
      const discountPerItem = item.price * (item.discountPercentage / 100);
      return acc + discountPerItem * item.quantity;
    }
    return acc;
  }, 0);

  return { cartItems, totalPrice, totalQuantity, totalDiscount };
};
