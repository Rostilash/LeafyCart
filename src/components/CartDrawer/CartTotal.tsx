import { convertMoney } from "../../utils/convertMoney";

export const CartTotal: React.FC<{ totalPrice: number; totalDiscount?: number }> = ({ totalPrice, totalDiscount }) => (
  <span className="flex justify-center text-center p-2 font-bold">Загальна сума: {convertMoney(totalPrice - (totalDiscount ?? 0))} ₴</span>
);
