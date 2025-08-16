import type { FoodProduct } from "../../../types/productTypes";
import { Badge } from "../Badge";

export const PreviewImage = ({ product }: { product: FoodProduct }) => {
  return (
    <div className="relative overflow-hidden w-full h-56 md:w-64 md:h-64 lg:w-120 lg:h-80 rounded-lg shadow">
      <img src={product.img} alt={product.name} className="w-full h-full object-cover" />

      {product.isNew && <Badge position="top-2 -left-2" text="NEW" />}
      {product.discountPercentage && <Badge position="top-2 -right-2" text={`Знижка: ${product.discountPercentage}%`} />}
    </div>
  );
};
