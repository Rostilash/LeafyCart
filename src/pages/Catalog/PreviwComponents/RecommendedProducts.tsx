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
    <div className="overflow-x-auto col-span-2 flex flex-col ">
      {productsIsNotEmpty && <h3 className="title-xl text-center p-4">Схожі товари</h3>}
      <div className="grid grid-cols-2 lg:grid-cols-5 sm:grid-cols-2 gap-2 justify-items-center">{recomendedProductsToRender}</div>
    </div>
  );
};
