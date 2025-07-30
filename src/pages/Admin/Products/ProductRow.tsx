import type { FoodProduct } from "../../../types/productTypes";

interface renderProductProps {
  product: FoodProduct;
  openEditModal: () => void;
  deleteRow: () => void;
}

export const ProductRow = ({ product, openEditModal, deleteRow }: renderProductProps) => {
  return (
    <div className="grid grid-cols-8 items-center justify-center border-b">
      <span>{product.id}</span>
      <img
        src={product.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLhGxI3K57BgdJz72uuuQqJQQLcHbA-iY0w&s"}
        alt={product.name}
        className="w-18 h-15 rounded-full"
      />
      <h3>{product.name}</h3>
      <span>{product.category}</span>
      <p>{product.description}</p>
      <span>{(product.price / 100).toFixed(2)} грн</span>
      <button className="p-2 border cursor-pointer bg-blue-300  min-w-30" onClick={openEditModal}>
        Редагувати
      </button>
      <button className="p-2 border cursor-pointer bg-red-300 min-w-30" onClick={deleteRow}>
        Видалити
      </button>
    </div>
  );
};
