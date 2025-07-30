import { Modal } from "../../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { categories, type FoodProduct } from "../../../types/productTypes";
import { useState, useEffect, type ChangeEvent } from "react";
import { ProductForm } from "./ProductForm";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../../../redux/slices/productSlice";
import { ProductRow } from "./ProductRow";

export const Products = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.products);
  const loading = useAppSelector((state) => state.products.loading);

  const [editingProduct, setEditingProduct] = useState<FoodProduct | null>(null);
  const [addingProduct, setAddingProduct] = useState<boolean | null>(false);
  const [findProduct, setFindProduct] = useState<string>("");

  const findProducts = allProducts.filter((p) => p.name.toLowerCase().includes(findProduct.toLowerCase()));

  // get allProducts
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const closeEditModal = () => {
    setEditingProduct(null);
    setAddingProduct(false);
  };

  const openEditModal = (product: FoodProduct) => {
    setEditingProduct(product);
  };

  const products = allProducts.map((product) => (
    <ProductRow
      key={product.id}
      product={product}
      openEditModal={() => openEditModal(product)}
      deleteRow={() => dispatch(deleteProduct(product.id))}
    />
  ));

  const findedProducts = findProducts.map((product) => (
    <ProductRow
      key={product.id}
      product={product}
      openEditModal={() => openEditModal(product)}
      deleteRow={() => dispatch(deleteProduct(product.id))}
    />
  ));

  return (
    <section className="p-10 w-400 m-auto">
      <span className="flex justify-around ">
        <button onClick={() => setAddingProduct(true)} className="btn-primary btn_hover">
          Add product
        </button>

        <div>
          <input
            type="text"
            placeholder="Пошук"
            className="p-2 border mr-2"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFindProduct(e.target.value)}
          />
          <button className="btn-primary">Знайти</button>
        </div>
      </span>

      <div className="grid grid-cols-8 border-b p-2">
        <span>№</span>
        <span>Картинка</span>
        <h3>Назва</h3>
        <span>Категорія</span>
        <p>Опис</p>
        <span>Ціна</span>
      </div>

      {/* main list of products */}
      {loading && <p>Завантажження</p>}
      {findProduct.trim() ? findedProducts : products}

      <Modal isOpen={!!editingProduct} onClose={closeEditModal}>
        <ProductForm
          initialProduct={editingProduct}
          onSubmit={(updatedProduct) => dispatch(updateProduct(updatedProduct as FoodProduct))}
          submitText="Зберегти зміни"
          closeEditModal={closeEditModal}
        />
      </Modal>

      <Modal isOpen={!!addingProduct} onClose={closeEditModal}>
        <ProductForm
          initialProduct={{ available: true, price: 0, category: categories[0], name: "", description: "", img: "", weight: "" }}
          onSubmit={(newProduct) => {
            dispatch(addProduct(newProduct as FoodProduct));
            setAddingProduct(false);
          }}
          submitText="Додати продукт"
          closeEditModal={closeEditModal}
        />
      </Modal>
    </section>
  );
};
