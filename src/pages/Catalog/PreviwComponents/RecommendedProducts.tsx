import type { FoodProduct } from "../../../types/productTypes";
import { ProductItem } from "../ProductItem";

interface RecomendedProductProps {
  products: FoodProduct[];
  onSelect: (product: FoodProduct) => void;
}

export const RecommendedProducts = ({ products, onSelect }: RecomendedProductProps) => {
  const recomendedProductsToRender = products.map((p) => <ProductItem key={p.id} product={p} onClick={() => onSelect(p)} />);

  const productsIsNotEmpty = products.length > 0;
  return (
    <div className="overflow-x-auto p-2 text-xs col-span-2 flex flex-col justify-start ">
      {productsIsNotEmpty && <h3 className="text-2xl mb-2 pl-2">Схожі товари</h3>}
      <div className="grid grid-cols-1 lg:grid-cols-5 sm:grid-cols-2 gap-2  justify-center">{recomendedProductsToRender}</div>
    </div>
  );
};
