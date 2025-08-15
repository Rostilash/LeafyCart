import type { FoodProduct } from "../../../types/productTypes";
import { Badge } from "../Badge";

export const PreviewImage = ({ product }: { product: FoodProduct }) => {
  return (
    <div className="relative overflow-hidden w-40 h-40 lg:w-120 lg:h-80">
      <img src={product.img} alt={product.name} className="w-full h-full object-cover rounded-xl" />

      {product.isNew && <Badge position="top-2 -left-2" text={`NEW`} />}
      {product.discountPercentage && <Badge position="top-2 -right-2" text={`Знижка: ${product.discountPercentage}%`} />}
    </div>
  );
};
