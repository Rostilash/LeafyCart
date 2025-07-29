import { Modal } from "../../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { categories, type FoodProduct } from "../../../types/productTypes";
import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { addProduct, updateProduct } from "../../../redux/slices/productSlice";

export const Products = () => {
  const allProducts = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  const [editingProduct, setEditingProduct] = useState<FoodProduct | null>(null);
  const [addingProduct, setAddingProduct] = useState<boolean | null>(false);

  const closeEditModal = () => {
    setEditingProduct(null);
    setAddingProduct(false);
  };

  const openEditModal = (product: FoodProduct) => {
    setEditingProduct(product);
  };

  const products = allProducts.map((product) => {
    const { id, name, category, description, price } = product;
    return (
      <div className="grid grid-cols-7 items-center justify-center border-b" key={product.id}>
        <span>{id}</span>
        <h3>{name}</h3>
        <span>{category}</span>
        <p>{description}</p>
        <span>{(price / 100).toFixed(2)} грн</span>
        <button className="p-2 border cursor-pointer bg-blue-300 " onClick={() => openEditModal(product)}>
          Редагувати
        </button>
        <button className="p-2 border cursor-pointer bg-red-300">Видалити</button>
      </div>
    );
  });

  return (
    <section className="p-10">
      <div>
        <button onClick={() => setAddingProduct(true)}>Add product</button>
      </div>
      <div className="grid grid-cols-7 border-b">
        <span>№</span>
        <h3>Назва</h3>
        <span>Категорія</span>
        <p>Опис</p>
        <span>Ціна</span>
      </div>
      {products}

      <Modal isOpen={!!editingProduct} onClose={closeEditModal}>
        <ProductForm
          initialProduct={editingProduct}
          onSubmit={(updatedProduct) => dispatch(updateProduct(updatedProduct as FoodProduct))}
          submitText="Зберегти зміни"
        />
      </Modal>

      <Modal isOpen={!!addingProduct} onClose={closeEditModal}>
        <ProductForm
          initialProduct={{ available: true, price: 0, category: categories[0], name: "", description: "", img: "", weight: "" }}
          onSubmit={(newProduct) => dispatch(addProduct(newProduct as FoodProduct))}
          submitText="Додати продукт"
        />
      </Modal>
    </section>
  );
};
