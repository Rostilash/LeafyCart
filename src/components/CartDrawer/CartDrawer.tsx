import type { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { clearCart, updateQuantity } from "../../redux/slices/cartSlice";
import type { CartDrawerProps } from "../../types/cartTypes";
import { CartItemElement } from "./CartItemElement";
import { CartHeader } from "./CartHeader";
import { CartTotal } from "./CartTotal";
import { CartCheckout } from "./CartCheckout";

export type UpdateAction = "increment" | "decrement";

export const CartDrawer: React.FC<CartDrawerProps> = ({ isCartVisible, onClose, setCheckoutModalOpen, totalPrice, totalDiscount }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);

  const onUpdateQuantity = (id: string, type: UpdateAction) => {
    dispatch(updateQuantity({ id, type }));
  };

  const handleCheckout = () => {
    if (!user) {
      alert("Щоб оформити замовлення, увійдіть у свій акаунт 🚀");
      // We can use Redirec to to login page
    } else {
      setCheckoutModalOpen(true);
    }
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
      className={` fixed top-0 right-0 h-full w-screen lg:w-100 bg-[var(--leafy-bg)]  border-l border-[var(--leafy-moss)] 
    transform transition-transform duration-300 ease-in-out z-100 ${
      isCartVisible ? "translate-x-0" : "translate-x-full"
    } overflow-y-scroll scrollbar-hide`}
    >
      {/* Header */}
      <CartHeader totalQuantity={totalQuantity} onClose={onClose} />

      {/* Items */}
      <div className="p-4 space-y-4 overflow-auto">
        {cartItems.length > 0 && (
          <button className="btn-primary w-full btn_hover p-4" onClick={() => dispatch(clearCart())}>
            Очистити Корзину
          </button>
        )}
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItemElement key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} onChangeQuantity={handleChangeQuanity} />
          ))
        ) : (
          <span className="text-[var(--leafy-gray)] flex justify-center">Кошик порожній...</span>
        )}
      </div>

      <CartTotal totalPrice={totalPrice} totalDiscount={totalDiscount} />

      <CartCheckout user={user} cartItemsLength={cartItems.length} onCheckout={handleCheckout} />
    </aside>
  );
};
