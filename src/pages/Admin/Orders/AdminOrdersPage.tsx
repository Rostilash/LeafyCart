import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { getAllOrders, updateOrderStatus } from "../../../redux/slices/orderSlice";
import { Breadcrumbs } from "../../Catalog/Breadcrumbs";
import { Loader } from "../../../components/Loader";

export const AdminOrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.order.all_orders);
  const loading = useAppSelector((state) => state.order.loading);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <>
      <Breadcrumbs />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Замовлення</h1>

        {loading && <Loader />}

        {!loading && orders.length === 0 && <p>Замовлень ще немає</p>}

        <table className="w-full border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Ім’я</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Сума</th>
              <th className="p-2 border">Статус</th>
              <th className="p-2 border">Дата</th>
              <th className="p-2 border">Прийняти</th>
              <th className="p-2 border">Скасувати</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.name}</td>
                <td className="p-2 border">{order.email}</td>
                <td className="p-2 border">{order.price} грн</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      order.status === "Нове замовлення"
                        ? "bg-blue-400"
                        : order.status === "Прийнято"
                        ? "bg-green-400"
                        : order.status === "Відхилено"
                        ? "bg-red-400"
                        : "bg-gray-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2 border">{new Date(order.createdAt).toLocaleString("uk-UA")}</td>
                <td className="p-2 border">
                  {order.status === "Нове замовлення" && (
                    <button onClick={() => dispatch(updateOrderStatus({ id: order.id, status: "Прийнято" }))} className="btn-primary">
                      Прийняти
                    </button>
                  )}
                </td>
                <td className="p-2 border">
                  {order.status === "Нове замовлення" && (
                    <button
                      onClick={() => dispatch(updateOrderStatus({ id: order.id, status: "Відхилено" }))}
                      className="btn-primary bg-[var(--leafy-error)]"
                    >
                      Скасувати
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
