import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { getAllOrders, updateOrderStatus } from "../../../redux/slices/orderSlice";
import { Breadcrumbs } from "../../Catalog/Breadcrumbs";
import { Loader } from "../../../components/Loader";
import { Check, X } from "lucide-react";
import { Button } from "@mui/material";

export const AdminOrdersPage = () => {
  const dispatch = useAppDispatch();
  const { all_orders } = useAppSelector((state) => state.order);
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

        {!loading && all_orders.length === 0 && <p>Замовлень ще немає</p>}

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
            {all_orders.map((order: any, index: number) => (
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
                <td className="p-2 border ">
                  {order.status === "Нове замовлення" && (
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<Check size={18} />}
                      onClick={() => dispatch(updateOrderStatus({ id: order.id, status: "Прийнято" }))}
                      className="flex gap-2"
                    >
                      Прийняти
                    </Button>
                  )}
                </td>
                <td className="p-2 border">
                  {order.status === "Нове замовлення" && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<X size={18} />}
                      onClick={() => dispatch(updateOrderStatus({ id: order.id, status: "Відхилено" }))}
                      className=" bg-[var(--leafy-error)] flex gap-2"
                    >
                      Скасувати
                    </Button>
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
