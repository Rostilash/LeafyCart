import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { getOrdersByUser, type OrderType } from "../../redux/slices/orderSlice";

export const PersonalInfo = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.uid);
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

  const userOrders = orders?.map((order, index) => (
    <div key={order.id} className="flex flex-row p-4 border max-w-150">
      <div className="flex flex-col">
        <span>
          Замовлення - {index + ":"} / Загальна вартість: <b>{order.price}</b>грн
        </span>

        <span className={` ${order.paymentStatus ? "text-red-300 font-bold" : ""}`}>
          Статус замовлення: {order.paymentStatus === "error" ? "Помилка" : order.paymentStatus}
        </span>
      </div>
    </div>
  ));

  return (
    <div className="grid grid-cols-2 ">
      <div className="">
        <h1 className="text-2xl text-center">Інформація про користувача</h1>
      </div>
      <div className="">
        <h1 className="text-2xl">Замовлення користувача</h1>
        {userOrders}
      </div>
    </div>
  );
};
