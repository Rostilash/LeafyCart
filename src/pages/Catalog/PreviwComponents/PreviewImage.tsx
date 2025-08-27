import type { FoodProduct } from "../../../types/productTypes";
import { Badge } from "../Badge";

export const PreviewImage = ({ product }: { product: FoodProduct }) => {
  return (
    <div
      className="relative overflow-hidden 
    w-[370px] sm:w-full min-w-[200px] 
    h-66 sm:h-56 md:h-64 lg:h-80
    pt-4 sm:pt-0 px-12 sm:px-0 
    "
    >
      <img
        src={product.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYybAaT5iRzjtX6TNY6tyZ6h-pT0F7Dx9JCA&s"}
        alt={product.name}
        className="w-full h-full object-cover"
      />

      {product.isNew && <Badge position="top-2 -left-2" text="NEW" />}
      {product.discountPercentage && <Badge position="top-2 -right-2" text={`Знижка: ${product.discountPercentage}%`} />}
    </div>
  );
};
