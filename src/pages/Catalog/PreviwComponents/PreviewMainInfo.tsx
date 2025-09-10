import { AddToCartButton } from "../../../components/Buttons/AddToCartButton";
import type { FoodProduct } from "../../../types/productTypes";
import { ProductPrice } from "../ProductPrice";
import { ProductRating } from "../ProductRating";

type PreviewMainInfoProps = {
  product: FoodProduct;
  userId: string | undefined;
  handleRateProduct: (rating: number, userId: string) => void;
};

export const PreviewMainInfo = ({ product, userId, handleRateProduct }: PreviewMainInfoProps) => {
  return (
    <div
      className="
      relative pt-[270px] min-w-[380px]
      sm:pt-4 
      mx-2 sm:mx-0 mb-4 sm:mb-0"
    >
      <h2 className="title-xl">{product.name}</h2>
      <span className={`${product.available ? "text-green-500" : "text-red-500"}`}>{product.available ? "В наявності" : "Товару немає"}</span>
      <ProductRating
        userId={userId}
        rating={product.rating || 0}
        ratingCount={product.ratingCount || 0}
        userRating={product.userRating || 0}
        onRate={handleRateProduct}
      />

      <p className="mt-2">{product.description}</p>
      <p className="text-lg font-semibold mt-4">
        <ProductPrice product={product} /> / за {product.weight}
      </p>
      {product.available && <AddToCartButton product={product} />}
    </div>
  );
};
