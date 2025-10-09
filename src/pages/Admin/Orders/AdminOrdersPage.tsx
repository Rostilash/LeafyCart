import { Button } from "@mui/material";
import { Check, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Loader } from "../../../components/Loader";
import { Modal } from "../../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { deleteOrder, getAllOrders, updateOrderStatus } from "../../../redux/slices/orderSlice";
import { Breadcrumbs } from "../../Catalog/Breadcrumbs";
import { OrdersListener } from "./OrdersListener";
import { OrderRow } from "./OrderRow";

export const AdminOrdersPage = () => {
  const dispatch = useAppDispatch();
  const { all_orders } = useAppSelector((state) => state.order);
  const loading = useAppSelector((state) => state.order.loading);

  const [openConfirmModal, setOpenConfirmModal] = useState("");
  console.log(all_orders);
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleApprove = useCallback(
    (id: string) => {
      dispatch(updateOrderStatus({ id, status: "Прийнято" }));
    },
    [dispatch]
  );

  const handleReject = useCallback(
    (id: string) => {
      dispatch(updateOrderStatus({ id, status: "Відхилено" }));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteOrder({ id }));
    },
    [dispatch]
  );

  return (
    <>
      <OrdersListener />

      <Breadcrumbs />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Замовлення</h1>
        <Button onClick={() => dispatch(getAllOrders())} style={{ padding: "10px", display: "flex", justifyContent: "center", width: "100%" }}>
          Оновити список
        </Button>
        {loading && <Loader />} {!loading && all_orders.length === 0 && <p>Замовлень ще немає</p>}
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
              <th className="p-2 border">Видалити</th>
            </tr>
          </thead>

          <tbody>
            {all_orders.map((order) => (
              <OrderRow key={order.id} order={order} handleApprove={handleApprove} handleReject={handleReject} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      </div>

      {openConfirmModal.length > 0 && (
        <Modal isOpen={!!openConfirmModal} onClose={() => setOpenConfirmModal("")}>
          <div className="h-[200px] w-full flex flex-col items-center justify-center gap-4">
            <h3 className="text-xl">Ви дійсно бажаєте видалити замовлення "{openConfirmModal}"?</h3>
            <div className="flex gap-4">
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  dispatch(deleteOrder({ id: openConfirmModal }));
                  setOpenConfirmModal("");
                }}
                className="h-10"
              >
                <Check size={18} />
              </Button>
              <Button variant="outlined" color="error" onClick={() => setOpenConfirmModal("")} className="h-10">
                <X size={18} />
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
