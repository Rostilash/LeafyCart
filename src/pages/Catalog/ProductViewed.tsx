import { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";
import { useAppDispatch } from "../../redux/reduxTypeHook";
import { setSelectedProduct } from "../../redux/slices/productSlice";
import { getRecentProducts } from "../../utils/getStorageProducts";
import type { FoodProduct } from "../../types/productTypes";

export const ProductViewed = ({ visibleProducts }: { visibleProducts: number }) => {
  const dispatch = useAppDispatch();
  const [recentProducts, setRecentProducts] = useState<FoodProduct[]>([]);

  useEffect(() => {
    const products = getRecentProducts();
    setRecentProducts(products);
  }, []);

  if (recentProducts.length === 0) return null;
  return (
    <div>
      <h2 className="title-xl text-center">Останні переглянуті товари</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4  justify-items-center">
        {recentProducts.slice(0, visibleProducts).map((product) => (
          <ProductItem key={product.id} product={product} onClick={() => dispatch(setSelectedProduct(product))} />
        ))}
      </div>
    </div>
  );
};
