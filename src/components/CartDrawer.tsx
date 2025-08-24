import type { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypeHook";
import { clearCart, updateQuantity } from "../redux/slices/cartSlice";
import { Badge } from "../pages/Catalog/Badge";
import { matchPrice } from "../utils/convertMoney";
import { convertMoney } from "../utils/convertMoney";
import type { CartDrawerProps } from "../types/cartTypes";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

type UpdateAction = "increment" | "decrement";

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
      // We can use Redirecto to login page
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

  const ourItems = cartItems.map((item) => {
    const discountedPrice = item.price && item.discountPercentage ? item.price * (1 - item.discountPercentage / 100) : item.price;
    return (
      <article
        key={item.id}
        className="grid grid-cols-[84px_1fr_auto] items-center gap-4 border p-4 bg-[var(--leafy-white)] rounded-xl shadow-sm relative "
      >
        <img src={item.img} alt="" className="icon_images_l shadow-[2px_8px_24px_rgba(0,0,0,0.6)] rounded-xl" />
        {Number(item.discountPercentage) > 0 && <Badge position="top-0 left-0" text={`Знижка: ${item.discountPercentage}%`} />}
        <div className="flex flex-col">
          <span className="pl-4">{item.name.length > 10 ? item.name.slice(0, 10) + "..." : item.name}</span>
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

  const matchedItems = cartItems.length > 0 ? ourItems : <span className="text-[var(--leafy-gray)] flex justify-center">Кошик порожній...</span>;

  return (
    <aside
      className={` fixed top-0 right-0 h-full w-screen lg:w-100 bg-[var(--leafy-bg)]  border-l border-[var(--leafy-moss)] 
    transform transition-transform duration-300 ease-in-out z-100 ${
      isCartVisible ? "translate-x-0" : "translate-x-full"
    } overflow-y-scroll scrollbar-hide`}
    >
      <div className="p-4 border-b border-[var(--leafy-moss)] font-semibold text-lg flex justify-between">
        <div className="flex  justify-end gap-2">
          У кошику
          <ShoppingCart size={25} className=" text-[var(--leafy-dark)]" />
        </div>
        : {totalQuantity} продуктів{" "}
        <span className="text-2xl cursor-pointer items-start" onClick={onClose}>
          ✕
        </span>
      </div>

      <div className="p-4 space-y-4 overflow-auto">
        {cartItems.length > 0 && (
          <button className="btn-primary w-full btn_hover p-4" onClick={() => dispatch(clearCart())}>
            Очистити Корзину
          </button>
        )}
        {matchedItems}
      </div>

      <span className="flex justify-center text-center p-2 font-bold">Загальна сума: {convertMoney(totalPrice - (totalDiscount ?? 0))} ₴</span>
      <div className="p-4 border-t border-[var(--leafy-moss)] space-y-2">
        {user ? (
          <button className="btn-primary w-full btn_hover" disabled={cartItems.length < 1} onClick={handleCheckout}>
            Оформити замовлення
          </button>
        ) : (
          <>
            <span className="text-gray-500">Щоб зробити замовлення треба авторизуватися</span>
            <Link to="/login" className="btn-primary w-full btn_hover flex justify-center">
              Увійти
            </Link>
          </>
        )}
      </div>
    </aside>
  );
};
