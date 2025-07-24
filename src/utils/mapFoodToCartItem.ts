import type { FoodProduct } from "../redux/slices/productSlice";
import type { CartItem } from "../types/cartTypes";

export const mapFoodProductToCartItem = (product: FoodProduct): CartItem => ({
  id: product.id,
  name: product.name,
  price: product.price,
  img: product.img,
  quantity: 1,
});
