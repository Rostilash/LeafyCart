import { Link } from "react-router-dom";

export const CartCheckoutButton: React.FC<{
  cartItemsLength: number;
  onClose: () => void;
}> = ({ cartItemsLength, onClose }) => {
  return (
    <div className="p-4 border-t border-[var(--leafy-moss)] space-y-2 flex justify-center items-center text-center">
      <Link
        to="/checkout"
        className={`btn-primary w-full btn_hover ${cartItemsLength < 1 ? "pointer-events-none opacity-50" : ""}`}
        onClick={onClose}
      >
        Оформити замовлення
      </Link>
    </div>
  );
};
