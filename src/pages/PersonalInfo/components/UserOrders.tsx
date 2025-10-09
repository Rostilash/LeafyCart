import { Card, CardContent } from "@mui/material";
import type { OrderType } from "../../../redux/slices/orderSlice";

interface UserOrdersProps {
  orders: OrderType[];
}

const getPaymentStatus = (status?: string) => {
  switch (status) {
    case "success":
      return { label: "Оплачено", color: "text-green-400" };
    case "good":
      return { label: "Готується до відправки", color: "text-yellow-400" };
    case "pending":
      return { label: "В обробці", color: "text-blue-400" };
    case "error":
      return { label: "Відхилено", color: "text-red-400" };
    default:
      return { label: "Невідомо", color: "text-gray-400" };
  }
};

export const UserOrders = ({ orders }: UserOrdersProps) => {
  return (
    <Card className="col-span-2 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ваші замовлення</h2>
        <div className="space-y-4">
          {orders && orders.length > 0 ? (
            orders.map((order, index) => {
              const { label, color } = getPaymentStatus(order.paymentStatus);
              return (
                <div key={order.id} className={`p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all ${color}`}>
                  <img src={`${order.payment === "cod" ? "liqpay.png" : "nova-post.png"}`} alt="оплата" width={20} height={20} className="inline" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Замовлення #{index + 1}</span>
                    <span className="text-lg font-bold">{order.price.toFixed(2)} грн</span>
                  </div>
                  <p className={`mt-2 text-sm  ${color}`}>Cтатус замовлення: {label}</p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">У вас ще немає замовлень.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
