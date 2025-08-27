export const CartCheckout: React.FC<{
  cartItemsLength: number;
  onClose: () => void;
  onCheckout: () => void;
}> = ({ cartItemsLength, onCheckout, onClose }) => {
  const handleCheckout = () => {
    onCheckout();
    onClose();
  };

  return (
    <div className="p-4 border-t border-[var(--leafy-moss)] space-y-2">
      <button className="btn-primary w-full btn_hover" disabled={cartItemsLength < 1} onClick={handleCheckout}>
        Оформити замовлення
      </button>
    </div>
  );
};
