import type { FoodProduct } from "../types/productTypes";
import { useMemo } from "react";

export interface Filters {
  minPrice: string;
  maxPrice: string;
  inStockOnly: boolean;
  countryFilter: string | null;
  range: number;
  sort: string;
}

export const useCategoryFilter = ({ products, category, filters }: { products: FoodProduct[]; category: string | undefined; filters: Filters }) => {
  return useMemo(() => {
    const categoryFiltered = products
      .filter((p) => p.category.toLowerCase().replace(/ /g, "-") === category)
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

    const maxCategoryPrice = Math.max(...categoryFiltered.map((p) => p.price));

    const filteredProducts = fullyFiltered.length > 0 || filters.sort !== "popular" ? fullyFiltered : categoryFiltered;

    const uniqueCountries = Array.from(new Set(filteredProducts.map((p) => p.generalInfo?.Країна).filter((c): c is string => Boolean(c))));

    return { filteredProducts, maxCategoryPrice, uniqueCountries };
  }, [products, category, filters]);
};
