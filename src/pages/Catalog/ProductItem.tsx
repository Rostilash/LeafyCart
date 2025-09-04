import type { FoodProduct } from "../../types/productTypes";
import { AddToCartButton } from "../../components/Buttons/AddToCartButton";
import { Badge } from "./Badge";
import { ProductPrice } from "./ProductPrice";
import { useAppSelector } from "../../redux/reduxTypeHook";
import { ProductSkeleton } from "../../components/ProductSkeleton";

export const ProductItem = ({ product, onClick }: { product: FoodProduct; onClick: () => void }) => {
  const isLoading = useAppSelector((state) => state.products.loading);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  const isOutOfStock = !product.available;

  const isOnePlusOne = product.tags?.includes("1+1");

  // if we have a gift in tegs (gift:<id>)
  const giftId = product.tags?.find((tag) => tag.startsWith("gift:"))?.split(":")[1];

  return (
    <article
      className={`flex flex-col items-center justify-center 
              w-full sm:w-[48%] md:w-[30%] lg:w-[20%] 
              sm:min-w-[200px] sm:max-w-[220px]  min-w-[120px] max-w-[200px]
              bg-[var(--leafy-white)] shadow-xs hover:shadow-green-200 
              relative overflow-hidden ${isOutOfStock ? "opacity-50" : ""}`}
    >
      {/* NEW */}
      {product.isNew && <Badge position="top-2 -left-2" text="NEW" />}

      {/* -% знижка */}
      {Number(product.discountPercentage) > 0 && <Badge position="top-2 -right-2" text={`-${product.discountPercentage}%`} />}

      {/* 1+1 акція */}
      {isOnePlusOne && <Badge position="top-10 -right-2" text="1+1" />}

      <img
        src={product.img}
        alt={product.name}
        width={160}
        height={160}
        className="w-full h-40 sm:h-48 object-cover cursor-pointer p-2"
        onClick={onClick}
        loading="lazy"
      />

      <div className="w-full bg-[var(--leafy-white)] flex flex-col  md:min-h-[130px] p-2">
        <div className="flex flex-col">
          <h3 className="text-lg truncate max-w-full" itemProp="name">
            {product.name}
          </h3>

          <span className="text-gray-700" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="UAH" />
            <ProductPrice product={product} />
          </span>
          <span>за {product.weight}</span>

          {giftId && <p className="text-xs text-green-600 mt-1">🎁 Подарунок у комплекті</p>}
        </div>

        {!isOutOfStock && <AddToCartButton product={product} />}
      </div>
    </article>
  );
};
