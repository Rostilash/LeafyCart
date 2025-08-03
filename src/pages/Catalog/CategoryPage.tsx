import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { ProductItem } from "./ProductItem";
import { getProducts, setSelectedProduct } from "../../redux/slices/productSlice";
import { Breadcrumbs } from "./Breadcrumbs";
import { FiltersPanel } from "./FiltersPanel";
import type { FoodProduct } from "../../types/productTypes";
import { Loader } from "../../components/Loader";
import { Pagination } from "../../components/Pagination";

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    inStockOnly: false,
    range: 0,
    sort: "popular",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const productsLoaded = useAppSelector((state) => state.products.loading);

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(getProducts());
    }
  }, [dispatch]);

  const openModal = (product: FoodProduct) => {
    dispatch(setSelectedProduct(product));
  };

  const categoryFiltered = products
    .filter((p) => p.category.toLowerCase().replace(/ /g, "-") === category)
    .sort((a, b) => {
      if (a.available === b.available) return 0;
      return a.available ? -1 : 1;
    });

  const maxCategoryPrice = Math.max(...categoryFiltered.map((p) => p.price));

  const fullyFiltered = categoryFiltered
    .filter((product) => {
      const price = product.price / 100;

      const inRange = (!filters.minPrice || price >= Number(filters.minPrice)) && (!filters.maxPrice || price <= Number(filters.maxPrice));

      const matchesRange = price >= filters.range;

      const stockOk = !filters.inStockOnly || product.available;

      return inRange && matchesRange && stockOk;
    })
    .sort((a, b) => {
      if (filters.sort === "cheep") return a.price - b.price;
      if (filters.sort === "overcost") return b.price - a.price;
      return 0;
    });

  const itemsPerPage = 18;

  const filteredProducts = fullyFiltered || filters.sort !== "popular" ? fullyFiltered : categoryFiltered;

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <Breadcrumbs />
      <div className="grid grid-cols-[246px_1fr] gap-2 p-2">
        <FiltersPanel onFilterChange={setFilters} maxCategoryPrice={maxCategoryPrice} />

        <div className="flex flex-col gap-4 px-2">
          {/* Products */}
          <div className="grid grid-cols-6 gap-2">
            {productsLoaded && <Loader />}
            {paginatedProducts.map((product) => (
              <ProductItem key={product.id} product={product} onClick={() => openModal(product)} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination totalItems={fullyFiltered.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </div>
    </>
  );
};
