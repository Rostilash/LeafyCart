import type { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypeHook";
import { updateQuantity } from "../redux/slices/cartSlice";
import { Footer } from "./Footer";
import { Badge } from "../pages/Catalog/Badge";
import { matchPrice } from "../utils/convertMoney";
import { convertMoney } from "../utils/convertMoney";
import type { CartDrawerProps } from "../types/cartTypes";

type UpdateAction = "increment" | "decrement";

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

  const ourItems = cartItems.map((item) => {
    const discountedPrice = item.price && item.discountPercentage ? item.price * (1 - item.discountPercentage / 100) : item.price;
    return (
      <article
        key={item.id}
        className="grid grid-cols-[84px_1fr_auto] items-center gap-4 border p-4 bg-[var(--leafy-white)] rounded-xl shadow-sm relative "
      >
        <img src={item.img} alt="" className="icon_images_l shadow-[2px_8px_24px_rgba(0,0,0,0.6)] rounded-xl" />
        {item.discountPercentage && <Badge position="top-0 left-0" text={`Знижка: ${item.discountPercentage}%`} />}
        <div className="flex flex-col">
          <span className="pl-4">{item.name}</span>
          <span className="pl-6"> {matchPrice(discountedPrice, item.quantity)} ₴</span>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <button onClick={() => onUpdateQuantity(item.id, "decrement")} className="px-2.5 py-1 bg-[var(--leafy-moss)] rounded text-sm  btn_hover">
              -
            </button>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => handleChangeQuanity(e, item.id)}
              className="w-12 text-center border rounded"
            />
            <button
              onClick={() => onUpdateQuantity(item.id, "increment")}
              className="px-2 py-1 bg-[var(--leafy-green)] text-white rounded text-sm btn_hover"
            >
              +
            </button>
          </div>
        </div>
      </article>
    );
  });

  const matchedItems = cartItems ? ourItems : <span className="text-[var(--leafy-gray)]">Кошик порожній</span>;

  return (
    <aside
      className={` fixed top-0 right-0 h-full w-100 bg-[var(--leafy-bg)]  border-l border-[var(--leafy-moss)] 
    transform transition-transform duration-300 ease-in-out z-50 ${
      isCartVisible ? "translate-x-0" : "translate-x-full"
    } overflow-y-scroll scrollbar-hide`}
    >
      <div className="p-4 border-b border-[var(--leafy-moss)] font-semibold text-lg flex justify-between">
        У кошику🛒: {totalQuantity} продуктів{" "}
        <span className="text-2xl cursor-pointer items-start" onClick={onClose}>
          ✕
        </span>
      </div>
      <div className="p-4 space-y-4 overflow-auto">{matchedItems}</div>

      <span className="flex justify-center text-center p-2 font-bold">Загальна сума: {convertMoney(totalPrice - (totalDiscount ?? 0))} ₴</span>
      <div className="p-4 border-t border-[var(--leafy-moss)]">
        <button className="btn-primary w-full btn_hover" disabled={cartItems.length < 1} onClick={() => setCheckoutModalOpen(true)}>
          Оформити замовлення
        </button>
      </div>

      <Footer />
    </aside>
  );
};
