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
    <>
      <h2 className="title-xl p-4 text-center">Останні переглянуті товари</h2>
      <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${visibleProducts} gap-6 px-2 justify-items-start`}>
        {recentProducts.slice(0, visibleProducts).map((product) => (
          <ProductItem key={product.id} product={product} onClick={() => dispatch(setSelectedProduct(product))} />
        ))}
      </div>
    </>
  );
};
