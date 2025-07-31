import type { FoodProduct } from "../types/productTypes";
import type { CartItem } from "../types/cartTypes";

export const mapFoodProductToCartItem = (product: FoodProduct): CartItem => ({
  id: product.id,
  name: product.name,
  discountPercentage: product.discountPercentage,
  price: product.price,
  img: product.img,
  quantity: 1,
});
