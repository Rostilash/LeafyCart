import { ShoppingCart } from "lucide-react";

export const CartHeader = ({ totalQuantity, onClose }: { totalQuantity: number; onClose: () => void }) => {
  return (
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
  );
};
