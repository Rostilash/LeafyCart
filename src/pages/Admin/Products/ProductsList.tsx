import { Modal } from "../../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { categories, type FoodProduct } from "../../../types/productTypes";
import { useState, useEffect, type ChangeEvent } from "react";
import { ProductForm } from "./ProductForm";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../../../redux/slices/productSlice";
import { ProductRow } from "./ProductRow";
import { Loader } from "../../../components/Loader";
import { PackagePlus } from "lucide-react";
import { Pagination } from "../../../components/Pagination";
import { Breadcrumbs } from "../../Catalog/Breadcrumbs";

export const Products = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.products);
  const loading = useAppSelector((state) => state.products.loading);

  const [editingProduct, setEditingProduct] = useState<FoodProduct | null>(null);
  const [addingProduct, setAddingProduct] = useState<boolean | null>(false);

  const [findProduct, setFindProduct] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Усі");
  const [currentPage, setCurrentPage] = useState(1);

  const findProducts = allProducts.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(findProduct.toLowerCase());
    const matchesCategory = selectedCategory === "Усі" || p.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  // get all Products
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

  useEffect(() => {
    setCurrentPage(1);
  }, [findProduct, selectedCategory]);

  const itemsPerPage = 10;

  const filteredProducts = findProduct.trim() || selectedCategory !== "Усі" ? findProducts : allProducts;

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <Breadcrumbs />
      <section className="w-full max-w-5xl mx-auto px-0 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-around ">
          <button onClick={() => setAddingProduct(true)} className="btn-primary btn_hover items-center flex flex-row mr-2">
            <PackagePlus className="w-6 h-6 text-white-700" /> <span className="hidden md:block">Додати продукт</span>
          </button>

          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Пошук"
              className="p-2 w-30 md:w-80 border rounded"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFindProduct(e.target.value)}
            />

            <select className="p-2 border rounded  w-25 md:w-60" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="Усі">Усі категорії</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              className="btn-primary btn_hover"
              onClick={() => {
                setSelectedCategory("Усі");
                setFindProduct("");
              }}
            >
              Очистити
            </button>
          </div>
        </div>

        <h1 className="text-3xl p-4 text-center">Продукти</h1>
        <div className="grid grid-cols-[1fr_60px_100px_80px] md:grid-cols-6 border-b p-2">
          <span className="hidden md:block">Зображення</span>
          <h3>Назва</h3>
          <span className="hidden md:block">Категорія</span>
          <span>Ціна</span>
          <span className="hidden md:block">Редагування</span>
          <span className="hidden md:block">Видалення</span>
        </div>

        {/* main list of products */}
        {loading && <Loader />}
        {paginatedProducts.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            openEditModal={() => openEditModal(product)}
            deleteRow={() => dispatch(deleteProduct(product.id))}
          />
        ))}

        <Pagination totalItems={filteredProducts.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />

        <Modal isOpen={!!editingProduct} onClose={closeEditModal}>
          {editingProduct && (
            <ProductForm
              initialProduct={editingProduct}
              onSubmit={(updatedProduct) => dispatch(updateProduct(updatedProduct as FoodProduct))}
              submitText="Зберегти зміни"
              closeEditModal={closeEditModal}
            />
          )}
        </Modal>

        <Modal isOpen={!!addingProduct} onClose={closeEditModal}>
          {addingProduct && (
            <ProductForm
              initialProduct={{
                available: true,
                price: 0,
                category: categories[0].name,
                name: "",
                description: "",
                img: "",
                weight: "",
              }}
              onSubmit={(newProduct) => {
                dispatch(addProduct(newProduct as FoodProduct));
                setAddingProduct(false);
              }}
              submitText="Додати продукт"
              closeEditModal={closeEditModal}
            />
          )}
        </Modal>
      </section>
    </>
  );
};
