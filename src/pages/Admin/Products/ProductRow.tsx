import { Pencil, Trash2 } from "lucide-react";
import type { FoodProduct } from "../../../types/productTypes";

interface renderProductProps {
  product: FoodProduct;
  openEditModal: () => void;
  deleteRow: () => void;
}

export const ProductRow = ({ product, openEditModal, deleteRow }: renderProductProps) => {
  return (
    <div className="grid grid-cols-6 items-center justify-center border-b">
      <img
        src={product.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLhGxI3K57BgdJz72uuuQqJQQLcHbA-iY0w&s"}
        alt={product.name.slice(0, 40)}
        className="w-18 h-15 rounded-full border-r"
      />
      <h3>{product.name}</h3>
      <span>{product.category}</span>
      <span>{(product.price / 100).toFixed(2)} грн</span>
      <button className="cursor-pointer hover:scale-125 flex flex-row justify-center" onClick={openEditModal}>
        <Pencil className="w-5 h-5 text-[var(--leafy-green)] hover:text-[var(--leafy-dark)] cursor-pointer" />
      </button>
      <button className="cursor-pointer hover:scale-125 flex flex-row justify-center" onClick={deleteRow}>
        <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer" />
      </button>
    </div>
  );
};
