import { Modal } from "../../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { categories, type FoodProduct } from "../../../types/productTypes";
import { useState, useEffect, type ChangeEvent } from "react";
import { ProductForm } from "./ProductForm";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../../../redux/slices/productSlice";
import { ProductRow } from "./ProductRow";
import { Loader } from "../../../components/Loader";

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
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <span className="flex justify-around ">
        <button onClick={() => setAddingProduct(true)} className="btn-primary btn_hover">
          Додати продукт
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
      <h1 className="text-3xl p-4 text-center">Редагування постів</h1>
      <div className="grid grid-cols-7 border-b p-2">
        <span>Картинка</span>
        <h3>Назва</h3>
        <span>Категорія</span>
        <p>Опис</p>
        <span>Ціна</span>
        <span>Редагування</span>
        <span>Видалення</span>
      </div>

      {/* main list of products */}
      {loading && <Loader />}
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
