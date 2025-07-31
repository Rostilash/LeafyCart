import type { FoodProduct } from "../../../types/productTypes";

interface renderProductProps {
  product: FoodProduct;
  openEditModal: () => void;
  deleteRow: () => void;
}

export const ProductRow = ({ product, openEditModal, deleteRow }: renderProductProps) => {
  const preview = product.description.slice(0, 40) + "...";

  return (
    <div className="grid grid-cols-7 items-center justify-center border-b">
      <img
        src={product.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLhGxI3K57BgdJz72uuuQqJQQLcHbA-iY0w&s"}
        alt={product.name.slice(0, 40)}
        className="w-18 h-15 rounded-full"
      />
      <h3>{product.name}</h3>
      <span>{product.category}</span>
      <p>{preview}</p>
      <span>{(product.price / 100).toFixed(2)} грн</span>
      <button className="p-2 border cursor-pointer bg-[var(--leafy-dark)] text-white hover:scale-105" onClick={openEditModal}>
        Редагувати
      </button>
      <button className="p-2 border cursor-pointer bg-[var(--leafy-error)] text-white hover:scale-105" onClick={deleteRow}>
        Видалити
      </button>
    </div>
  );
};
