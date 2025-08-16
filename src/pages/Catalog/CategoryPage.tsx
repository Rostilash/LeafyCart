import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { getProducts, setSelectedProduct } from "../../redux/slices/productSlice";
import { Breadcrumbs } from "./Breadcrumbs";
import { FiltersPanel } from "./CategoryComponents/FiltersPanel";
import type { FoodProduct } from "../../types/productTypes";
import { Loader } from "../../components/Loader";
import { CategoryProducts } from "./CategoryComponents/CategoryProducts";
import { useCategoryFilter } from "../../utils/useCategoryFilter";

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
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
  }, [isLoading, products.length, dispatch]);

  // Our custoom filter utils
  const { filteredProducts, maxCategoryPrice, uniqueCountries } = useCategoryFilter({ products, filters, category });

  return (
    <>
      <Breadcrumbs />
      <div className="grid grid-rows-2 md:grid-cols-[246px_1fr] gap-2 p-2 h-screen">
        <FiltersPanel filters={filters} onFilterChange={setFilters} maxCategoryPrice={maxCategoryPrice} uniqueCountries={uniqueCountries} />

        {isLoading && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}

        <CategoryProducts filteredProducts={filteredProducts} openModal={(product: FoodProduct) => dispatch(setSelectedProduct(product))} />
      </div>
    </>
  );
};
