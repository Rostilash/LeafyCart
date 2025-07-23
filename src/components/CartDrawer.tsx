import { Footer } from "./Footer";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypeHook";
import { updateQuantity } from "../redux/slices/cartSlice";

type CartDrawerProps = {
  isCartVisible: boolean;
  setCheckoutModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

type UpdateAction = "increment" | "decrement";

const matchItemPrice = (price: number, quantity: number): string => {
  return ((price / 100) * quantity).toFixed(2);
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ isCartVisible, onClose, setCheckoutModalOpen }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const onUpdateQuantity = (id: number, type: UpdateAction) => {
    dispatch(updateQuantity({ id, type }));
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const ourItems = cartItems.map((item) => (
    <article key={item.id} className="grid grid-cols-[84px_1fr_auto] items-center gap-4 border p-4 bg-[var(--leafy-white)] rounded-xl shadow-sm">
      <img src={item.img} alt="" className="icon_images_l shadow-[2px_8px_24px_rgba(0,0,0,0.6)] rounded-xl" />

      <div className="flex flex-col">
        <span className="pl-4">{item.name}</span>
        <span className="pl-6"> {matchItemPrice(item.price, item.quantity)} грн</span>
      </div>

      <div>
        <div className="flex items-center space-x-2">
          <button onClick={() => onUpdateQuantity(item.id, "decrement")} className="px-2.5 py-1 bg-[var(--leafy-moss)] rounded text-sm  btn_hover">
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, "increment")}
            className="px-2 py-1 bg-[var(--leafy-green)] text-white rounded text-sm btn_hover"
          >
            +
          </button>
        </div>
      </div>
    </article>
  ));
  const matchedItems = cartItems ? ourItems : <span className="text-[var(--leafy-gray)]">Кошик порожній</span>;

  return (
    <aside
      className={` fixed top-0 right-0 h-full w-100 bg-[var(--leafy-light)]  border-l border-[var(--leafy-moss)] 
    transform transition-transform duration-300 ease-in-out z-50 ${isCartVisible ? "translate-x-0" : "translate-x-full"} `}
    >
      <div className="p-4 border-b border-[var(--leafy-moss)] font-semibold text-lg flex justify-between">
        У кошику🛒: {totalQuantity} продуктів{" "}
        <span className="text-2xl cursor-pointer items-start" onClick={onClose}>
          ✕
        </span>
      </div>
      <div className="p-4 space-y-4 overflow-auto">{matchedItems}</div>
      <div className="p-4 border-t border-[var(--leafy-moss)]">
        <button className="btn-primary w-full btn_hover" disabled={cartItems.length < 1} onClick={() => setCheckoutModalOpen(true)}>
          Оформити замовлення
        </button>
      </div>

      <Footer />
    </aside>
  );
};
