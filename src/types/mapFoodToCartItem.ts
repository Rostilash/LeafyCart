import type { FoodProduct } from "./productTypes";
import type { CartItem } from "./cartTypes";

export const mapFoodProductToCartItem = (product: FoodProduct): CartItem => ({
  id: product.id,
  name: product.name,
  discountPercentage: product.discountPercentage,
  price: product.price,
  img: product.img,
  quantity: 1,
});
