import type { FoodProduct } from "../../types/productTypes";
import { AddToCartButton } from "../../components/Buttons/AddToCartButton";
import { useConvertMoney } from "../../utils/useConvertMoney";

export const ProductItem = ({ product, onClick }: { product: FoodProduct; onClick: () => void }) => {
  const discountedPrice = product.price && product.discountPercentage ? product.price * (1 - product.discountPercentage / 100) : product.price;

  const productPrice = product.discountPercentage ? (
    <span itemProp="price" className="text-base font-medium">
      <span className="line-through text-gray-400 mr-2">{useConvertMoney(product.price)} грн</span>
      <span className="text-red-500 font-semibold">{useConvertMoney(discountedPrice)} грн</span>
    </span>
  ) : (
    <span itemProp="price" className="text-base font-medium">
      {useConvertMoney(product.price)} грн
    </span>
  );

  return (
    <article className="flex flex-col items-center justify-center w-full max-w-xs bg-[var(--leafy-sage)] shadow-2xl rounded-2xl btn_hover relative overflow-hidden">
      {product.isNew && <Badge position="top-2 -left-2" text="NEW" />}
      {product.discountPercentage && <Badge position="top-2 -right-2" text={`Знижка: ${product.discountPercentage}%`} />}

      <img
        src={product.img}
        alt={product.name}
        className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full p-2 cursor-pointer"
        onClick={onClick}
      />

      <div className="w-full bg-[var(--leafy-white)] p-4 rounded-md flex flex-col gap-2 min-h-[120px]">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg truncate max-w-full" itemProp="name">
            {product.name}
          </h3>
          <span className="text-gray-700" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            {productPrice}
          </span>
          <span>за {product.weight}</span>
        </div>

        <AddToCartButton product={product} />
      </div>
    </article>
  );
};

const Badge = ({ position, text }: { position: string; text: string }) => (
  <span className={`absolute ${position} bg-red-400 py-1 px-4 rounded-xl text-white text-xs whitespace-nowrap`}>{text}</span>
);
