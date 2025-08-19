import type { FoodProduct } from "../types/productTypes";
import { useMemo } from "react";
import { getMaxPrice, getUniqueCountries } from "./filters";

export interface Filters {
  minPrice: string;
  maxPrice: string;
  inStockOnly: boolean;
  countryFilter: string | null;
  range: number;
  sort: string;
}

export const useCategoryFilter = ({
  products,
  categoryName,
  filters,
}: {
  products: FoodProduct[];
  categoryName: string | undefined;
  filters: Filters;
}) => {
  return useMemo(() => {
    const categoryFiltered = products
      .filter((p) => {
        if (!categoryName) return true;
        if (categoryName === "знижки") return true;
        return p.category.toLowerCase().replace(/ /g, "-") === categoryName;
      })
      .sort((a, b) => (a.available === b.available ? 0 : a.available ? -1 : 1));

    const fullyFiltered = categoryFiltered
      .filter((product) => {
        const price = product.price / 100;
        const inRange = (!filters.minPrice || price >= Number(filters.minPrice)) && (!filters.maxPrice || price <= Number(filters.maxPrice));
        const matchesRange = price >= filters.range;
        const stockOk = !filters.inStockOnly || product.available;
        const matchesCountry = !filters.countryFilter || product.generalInfo?.Країна === filters.countryFilter;

        return inRange && matchesRange && stockOk && matchesCountry;
      })
      .sort((a, b) => {
        if (filters.sort === "cheep") return a.price - b.price;
        if (filters.sort === "overcost") return b.price - a.price;
        return 0;
      });

    const maxCategoryPrice = getMaxPrice(categoryFiltered);
    const filteredProducts = fullyFiltered.length > 0 || filters.sort !== "popular" ? fullyFiltered : categoryFiltered;
    const uniqueCountries = getUniqueCountries(filteredProducts);

    return { filteredProducts, maxCategoryPrice, uniqueCountries };
  }, [products, categoryName, filters]);
};
