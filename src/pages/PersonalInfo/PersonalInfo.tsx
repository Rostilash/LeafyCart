import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { getOrdersByUser, type OrderType } from "../../redux/slices/orderSlice";
import { Card, CardContent } from "@mui/material";

export const PersonalInfo = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.uid);
  const userEmail = useAppSelector((state) => state.auth.user?.email);
  const all_orders = useAppSelector((state) => state.order.all_orders);
  const [orders, setOrders] = useState<OrderType[] | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(getOrdersByUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    setOrders(all_orders);
  }, [all_orders]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Info */}
        <Card className="col-span-1 shadow-lg rounded-2xl">
          <CardContent className="p-6 flex flex-col items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${userEmail}&background=random`}
              alt="User Avatar"
              className="w-24 h-24 rounded-full shadow-md mb-4"
            />
            <h1 className="text-xl font-semibold text-gray-800">Особистий кабінет</h1>
            <p className="text-gray-500 mt-1">{userEmail}</p>
          </CardContent>
        </Card>

        {/* Orders */}
        <Card className="col-span-2 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ваші замовлення</h2>
            <div className="space-y-4">
              {orders && orders.length > 0 ? (
                orders.map((order, index) => (
                  <div key={order.id} className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Замовлення #{index + 1}</span>
                      <span className="text-lg font-bold text-indigo-600">{order.price} грн</span>
                    </div>

                    <p
                      className={`mt-2 text-sm ${
                        order.paymentStatus === "error"
                          ? "text-red-500 font-semibold"
                          : order.paymentStatus === "success"
                          ? "text-green-600 font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      Статус: {order.paymentStatus === "error" ? "Помилка" : order.paymentStatus === "success" ? "Оплачено" : "В обробці"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">У вас ще немає замовлень.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
