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

  // Rendering the Product (castum hook)
  const { productToShow, handleRateProduct } = useProductRating(product, userId);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto 
    md:p-2 overflow-y-auto scrollbar-hide max-h-[100vh] md:max-h-[85vh] z-50"
    >
      {/* Main Image */}

      <PreviewImage product={productToShow} />

      {/*Product name */}
      {/* <div className="w-screen md:w-100 md:col-span-full"> */}
      <PreviewMainInfo product={productToShow} userId={userId} handleRateProduct={handleRateProduct} />
      {/* </div> */}
      <div className="space-y-6 w-screen">
        {/* Nutrition info */}
        <PreviewInfo title="Харчові властивості" subObject={productToShow.nutritionFacts} />
        {/* General info */}
        <PreviewInfo title="Загальна інформація" subObject={productToShow.generalInfo} />
      </div>
      {/* Recomended products */}
      <RecommendedProducts products={recommendedProducts} onSelect={(p) => dispatch(setSelectedProduct(p))} />

      {/* Viewed products */}
      <div className="w-screen md:w-full md:col-span-full">
        <ProductViewed visibleProducts={5} />
      </div>

      <PreviewFooter />
    </div>
  );
};
