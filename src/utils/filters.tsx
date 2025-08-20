import type { FoodProduct } from "../types/productTypes";
import type { AppDispatch } from "../redux/store";
import { setSelectedProduct } from "../redux/slices/productSlice";
import { ProductItem } from "../pages/Catalog/ProductItem";

export const getMaxPrice = (products: FoodProduct[]): number => {
  if (!products.length) return 0;
  return Math.max(...products.map((p) => p.price));
};

export const getUniqueCountries = (products: FoodProduct[]): string[] => {
  return Array.from(new Set(products.map((p) => p.generalInfo?.Країна).filter((c): c is string => Boolean(c))));
};

export const getFilteredProductItems = (products: FoodProduct[], filterFn: (p: FoodProduct) => boolean, dispatch: AppDispatch, limit = 14) => {
  return products
    .filter(filterFn)
    .slice(0, limit)
    .map((product) => <ProductItem key={product.id} product={product} onClick={() => void dispatch(setSelectedProduct(product))} />);
};

export const getProductsForSubcategory = (products: FoodProduct[], subcategoryName: string) => {
  switch (subcategoryName) {
    case "знижки":
      return products.filter((p) => p.discountPercentage && p.discountPercentage > 0);
    case "1+1":
      return products.filter((p) => p.tags?.includes("1+1"));
    default:
      return products
        .filter((p) => p.category.toLowerCase().replace(/ /g, "-") === subcategoryName.toLowerCase())
        .sort((a, b) => (a.available === b.available ? 0 : a.available ? -1 : 1));
  }
};
