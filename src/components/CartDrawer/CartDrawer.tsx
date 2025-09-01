import type { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { clearCart, updateQuantity } from "../../redux/slices/cartSlice";
import type { CartDrawerProps, UpdateAction } from "../../types/cartTypes";
import { CartItemElement } from "./CartItemElement";
import { CartHeader } from "./CartHeader";
import { CartTotal } from "./CartTotal";
import { CartCheckoutButton } from "./CartCheckoutButton";
import { Button } from "@mui/material";
import { Trash2 } from "lucide-react";

export const CartDrawer: React.FC<CartDrawerProps> = ({ isCartVisible, onClose, setCheckoutModalOpen, totalPrice, totalDiscount }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const onUpdateQuantity = (id: string, type: UpdateAction) => {
    dispatch(updateQuantity({ id, type }));
  };

  const handleChangeQuanity = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const newVal = parseInt(e.target.value, 10);
    if (!isNaN(newVal) && newVal > 0) {
      dispatch(updateQuantity({ id: id, type: "set", value: newVal }));
    }
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <aside
      className={` fixed top-0 right-0 h-full w-screen lg:w-100 bg-[var(--leafy-bg)] shadow-2xl border-[var(--leafy-moss)] 
    transform transition-transform duration-300 ease-in-out z-100 ${
      isCartVisible ? "translate-x-0" : "translate-x-full"
    } overflow-y-scroll scrollbar-hide`}
    >
      {/* Header */}
      <CartHeader totalQuantity={totalQuantity} onClose={onClose} />

      {/* Items */}
      <div className="p-4 space-y-4 overflow-auto">
        {cartItems.length > 0 && (
          <Button fullWidth variant="outlined" color="error" startIcon={<Trash2 />} onClick={() => dispatch(clearCart())} sx={{ mb: 2 }}>
            Очистити корзину
          </Button>
        )}
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItemElement key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} onChangeQuantity={handleChangeQuanity} />
          ))
        ) : (
          <span className="text-[var(--leafy-gray)] flex justify-center">Кошик порожній...</span>
        )}
      </div>

      {/* Total Price */}
      <CartTotal totalPrice={totalPrice} totalDiscount={totalDiscount} />

      {/* Accept button */}
      <CartCheckoutButton cartItemsLength={cartItems.length} onCheckout={() => setCheckoutModalOpen(true)} onClose={onClose} />
    </aside>
  );
};
