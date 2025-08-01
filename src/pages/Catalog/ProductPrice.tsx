import type { FoodProduct } from "../../types/productTypes";
import { useConvertMoney } from "../../utils/useConvertMoney";

interface PriceProps {
  product: FoodProduct;
}
export const ProductPrice = ({ product }: PriceProps) => {
  if (!product.price) return null;

  const discountedPrice = product.discountPercentage ? product.price * (1 - product.discountPercentage / 100) : product.price;

  return product.discountPercentage ? (
    <span itemProp="price" className="text-vase font-medium">
      <span className="line-through text-gray-400 mr-2">{useConvertMoney(product.price)} ₴</span>-{" "}
      <span className="text-red-500 font-semibold">{useConvertMoney(discountedPrice)} ₴</span>
    </span>
  ) : (
    <span itemProp="price" className="text-base font-medium">
      {useConvertMoney(product.price)} ₴
    </span>
  );
};
