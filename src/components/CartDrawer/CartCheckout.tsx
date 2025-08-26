import { Link } from "react-router-dom";
import type { AuthUser } from "../../redux/slices/authSlice";

export const CartCheckout: React.FC<{
  user: AuthUser | null;
  cartItemsLength: number;
  onCheckout: () => void;
}> = ({ user, cartItemsLength, onCheckout }) => (
  <div className="p-4 border-t border-[var(--leafy-moss)] space-y-2">
    {user ? (
      <button className="btn-primary w-full btn_hover" disabled={cartItemsLength < 1} onClick={onCheckout}>
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
);
