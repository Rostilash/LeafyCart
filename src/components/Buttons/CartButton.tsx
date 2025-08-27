import { ShoppingCart } from "lucide-react";

type CartButtonProps = {
  quantity?: number;
  onClick: () => void;
};

export const CartButton: React.FC<CartButtonProps> = ({ quantity, onClick }) => (
  <button onClick={onClick} className="relative p-2 cursor-pointer">
    <ShoppingCart size={20} className="w-6 h-6 text-[var(--leafy-dark)] hover:scale-110" />
    {quantity !== undefined && quantity > 0 && (
      <span className="absolute -top-1 -right-1 bg-[var(--leafy-green)] font-bold text-[var(--leafy-white)] text-xs rounded-full px-1.5 py-0.5 shadow-md">
        {quantity}
      </span>
    )}
  </button>
);
