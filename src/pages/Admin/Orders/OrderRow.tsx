import React from "react";
import { Button } from "@mui/material";
import { Check, X } from "lucide-react";

interface OrderRowProps {
  order: any;
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export const OrderRow = React.memo(({ order, handleApprove, handleReject, onDelete }: OrderRowProps) => {
  return (
    <tr key={order.id} className="hover:bg-gray-50">
      <td className="p-2 border">{order.id}</td>
      <td className="p-2 border">{order.name}</td>
      <td className="p-2 border">{order.email}</td>
      <td className="p-2 border">{order.price.toFixed(2)} грн</td>
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
          <Button variant="outlined" color="success" startIcon={<Check size={18} />} onClick={() => handleApprove(order.id)}>
            Прийняти
          </Button>
        )}
      </td>
      <td className="p-2 border">
        {order.status === "Нове замовлення" && (
          <Button variant="outlined" color="error" startIcon={<X size={18} />} onClick={() => handleReject(order.id)}>
            Скасувати
          </Button>
        )}
      </td>
      <td className="p-2 border">
        <Button variant="outlined" color="error" onClick={() => onDelete(order.id)} className="bg-[var(--leafy-error)] flex gap-2 w-2">
          <X size={18} />
        </Button>
      </td>
    </tr>
  );
});
