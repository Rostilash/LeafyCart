import { useState } from "react";
import type { FoodProduct } from "../../redux/slices/productSlice";
import { Modal } from "../../components/Modal";
import { ProductPreviewModal } from "./ProductPreviewModal";
import { AddToCartButton } from "../../components/Buttons/AddToCartButton";

export const ProductItem = ({ product }: { product: FoodProduct }) => {
  const [isCartOpened, setIsCartOpened] = useState(false);

  const handleOpenModel = () => {
    setIsCartOpened(true);
  };

  return (
    <article key={product.id} className="flex flex-col items-center justify-center w-55 bg-[var(--leafy-sage)] shadow-2xl rounded-2xl btn_hover">
      <img src={product.img} alt={product.name} className="w-50 h-50 object-cover rounded-[50%] p-2 cursor-pointer" onClick={handleOpenModel} />

      <div className="w-full bg-[var(--leafy-white)] p-4 rounded-md flex flex-col">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg" itemProp="name">
            {product.name}
          </h3>
          <span className="text-gray-700" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            <span itemProp="price">{(product.price / 100).toFixed(2)} грн</span>
          </span>
          <span>за {product.weight}</span>
        </div>

        <AddToCartButton product={product} />
      </div>
      <Modal isOpen={isCartOpened} onClose={() => setIsCartOpened(false)}>
        <ProductPreviewModal product={product} />
      </Modal>
    </article>
  );
};
