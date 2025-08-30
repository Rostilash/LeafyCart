import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { setSelectedProduct } from "../../redux/slices/productSlice";
import { type FoodProduct } from "../../types/productTypes";
import { ProductViewed } from "./ProductViewed";
import { PreviewImage } from "./PreviwComponents/PreviewImage";
import { PreviewMainInfo } from "./PreviwComponents/PreviewMainInfo";
import { PreviewInfo } from "./PreviwComponents/PreviewInfo";
import { PreviewFooter } from "./PreviwComponents/PreviewFooter";
import { RecommendedProducts } from "./PreviwComponents/RecommendedProducts";
import { getRecommendedProducts } from "../../utils/getRecommendedProducts";
import { useProductRating } from "../../utils/useProductRating";

export const ProductPreviewModal = ({ product }: { product: FoodProduct }) => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.products);
  const userId = useAppSelector((state) => state.auth.user?.uid);

  // Filtering our products by keywords (with useMemo)
  const recommendedProducts = getRecommendedProducts(product, allProducts);

  // Rendering the Product (Custom hook)
  const { productToShow, handleRateProduct } = useProductRating(product, userId);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 md:gap-4 max-w-6xl mx-auto 
    overflow-y-auto scrollbar-hide max-h-[100vh] md:max-h-[85vh] z-50"
    >
      {/* Main Image */}
      <PreviewImage product={productToShow} />

      {/* Product name */}
      <PreviewMainInfo product={productToShow} userId={userId} handleRateProduct={handleRateProduct} />

      {/* Nutrition info */}
      <PreviewInfo title="Харчові властивості" subObject={productToShow.nutritionFacts} />
      {/* General info */}
      <PreviewInfo title="Загальна інформація" subObject={productToShow.generalInfo} />

      {/* Recomended products */}
      <RecommendedProducts products={recommendedProducts} onSelect={(p) => dispatch(setSelectedProduct(p))} />

      {/* Viewed products */}
      <div className="col-span-2 md:col-span-full">
        <ProductViewed visibleProducts={5} />
      </div>

      <PreviewFooter />
    </div>
  );
};
