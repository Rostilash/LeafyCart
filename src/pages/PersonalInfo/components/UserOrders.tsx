import { Card, CardContent } from "@mui/material";
import type { OrderType } from "../../../redux/slices/orderSlice";

interface UserOrdersProps {
  orders: OrderType[];
}

export const UserOrders = ({ orders }: UserOrdersProps) => {
  return (
    <Card className="col-span-2 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ваші замовлення</h2>
        <div className="space-y-4">
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={order.id} className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Замовлення #{index + 1}</span>
                  <span className="text-lg font-bold">{order.price.toFixed(2)} грн</span>
                </div>

                <p
                  className={`mt-2 text-sm ${
                    order.paymentStatus === "error"
                      ? "text-[var(--leafy-error)] font-semibold"
                      : order.paymentStatus === "success"
                      ? "text-[var(--leafy-accept)] font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  Cтатус замовлення: {order.paymentStatus === "error" ? "Не оплатив." : order.paymentStatus === "success" ? "Оплачено" : "В обробці"}
                </p>
                <p
                  className={`mt-2 text-sm ${
                    order.status === "Помилка"
                      ? "text-[var(--leafy-error)] font-semibold"
                      : order.status === "Прийнято"
                      ? "text-[var(--leafy-accept)] font-semibold"
                      : order.status === "Відхилено"
                      ? "text-[var(--leafy-error)] font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">У вас ще немає замовлень.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
