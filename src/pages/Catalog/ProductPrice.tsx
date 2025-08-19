import type { FoodProduct } from "../../types/productTypes";
import { convertMoney } from "../../utils/convertMoney";

interface PriceProps {
  product: FoodProduct;
}
export const ProductPrice = ({ product }: PriceProps) => {
  if (!product.price) return null;

  const discountedPrice = product.discountPercentage ? product.price * (1 - product.discountPercentage / 100) : product.price;
  return product.discountPercentage ? (
    <span itemProp="price" className="text-vase font-medium">
      <span className="line-through text-gray-400 mr-2">{convertMoney(product.price)} ₴</span>-{" "}
      {Number(convertMoney(product.price)) > 100 && <br className="flex sm:hidden" />}
      <span className="text-red-500 font-semibold">{convertMoney(discountedPrice)} ₴</span>
    </span>
  ) : (
    <span itemProp="price" className="text-base font-medium">
      {convertMoney(product.price)} ₴
    </span>
  );
};
