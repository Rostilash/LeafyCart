import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { getProducts, setSelectedProduct } from "../../../redux/slices/productSlice";
import { Breadcrumbs } from "../Breadcrumbs";
import { FiltersPanel } from "./FiltersPanel";
import type { FoodProduct } from "../../../types/productTypes";
import { CategoryProducts } from "./CategoryProducts";
import { useCategoryFilter } from "../../../utils/useCategoryFilter";
import { getProductsForSubcategory } from "../../../utils/filters";

export const CategoryPage = () => {
  const { category: categoryName } = useParams<{ category: string }>();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    inStockOnly: false,
    countryFilter: null as string | null,
    range: 0,
    sort: "popular",
  });

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const isLoading = useAppSelector((state) => state.products.loading);

  // Rerender the products with useEffect if they didnt render with 1 time render
  useEffect(() => {
    if (!isLoading && products.length === 0) {
      dispatch(getProducts());
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [categoryName]);

  useEffect(() => {
    if (categoryName) {
      document.title = `Каталог - ${categoryName} | LeafyCaty`;
    }
  }, [categoryName]);

  // Our custoom filter utils
  const subcategoryProducts = categoryName ? getProductsForSubcategory(products, categoryName.toLowerCase()) : products;

  const { filteredProducts, maxCategoryPrice, uniqueCountries } = useCategoryFilter({
    products: subcategoryProducts,
    filters,
  });

  return (
    <>
      <Breadcrumbs />
      <div ref={containerRef} className="grid md:grid-cols-[250px_1fr] md:max-w-[2500px] gap-2">
        <FiltersPanel filters={filters} onFilterChange={setFilters} maxCategoryPrice={maxCategoryPrice} uniqueCountries={uniqueCountries} />

        <CategoryProducts filteredProducts={filteredProducts} openModal={(product: FoodProduct) => dispatch(setSelectedProduct(product))} />
      </div>
    </>
  );
};
