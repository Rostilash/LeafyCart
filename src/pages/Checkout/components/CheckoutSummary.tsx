import { convertMoney } from "../../../utils/convertMoney";

interface CheckoutSummaryProps {
  discount: number;
  delivery: number;
  totalPrice: number;
  totalSummary: number;
}

export const CheckoutSummary = ({ discount, delivery, totalPrice, totalSummary }: CheckoutSummaryProps) => {
  return (
    <div className="bg-gray-100 p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold mb-4">Підсумок замовлення</h2>
      <div className="flex justify-between">
        <span>Ціна:</span>
        <span>{convertMoney(totalPrice)} грн</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Знижка:</span>
          <span>-{discount.toFixed(2)} грн</span>
        </div>
      )}
      {delivery > 0 && (
        <div className="flex justify-between">
          <span>Доставка:</span>
          <span>{delivery.toFixed(2)} грн</span>
        </div>
      )}
      <hr />
      <div className="flex justify-between font-bold text-lg">
        <span>Всього:</span>
        <span>{totalSummary.toFixed(2)} грн</span>
      </div>
    </div>
  );
};
