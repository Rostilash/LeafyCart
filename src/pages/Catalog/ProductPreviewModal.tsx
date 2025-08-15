import { AddToCartButton } from "../../components/Buttons/AddToCartButton";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { fetchUserRating, rateProduct, setSelectedProduct } from "../../redux/slices/productSlice";
import { type FoodProduct } from "../../types/productTypes";
import { Badge } from "./Badge";
import { ProductItem } from "./ProductItem";
import { ProductPrice } from "./ProductPrice";
import { ProductRating } from "./ProductRating";
import { useState, useEffect } from "react";
import { ProductViewed } from "./ProductViewed";

export const ProductPreviewModal = ({ product }: { product: FoodProduct }) => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.products);
  const userId = useAppSelector((state) => state.auth.user?.uid);
  const [newProduct, setNewProduct] = useState<FoodProduct | null>(null);
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);

  useEffect(() => {
    if (product && userId) {
      fetchUserRating(userId, product.id).then((rating) => {
        setNewProduct({ ...product, userRating: rating || 0 });
      });
    }
  }, [product, userId]);

  // filtering our products by keywords
  const keywords = product.name.toLowerCase().split(" ");
  const recomendedProductsByKeywords = allProducts
    .filter((p) => p.id !== product.id && keywords.some((k) => p.name.toLowerCase().includes(k)))
    .slice(0, 5);

  const recomendedProductsByCategory = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .sort((a, b) => {
      if (a.available === b.available) return 0;
      return a.available ? -1 : 1;
    })
    .slice(0, 5);

  // Rendering the Product
  const recomendedProductsToRender = (recomendedProductsByKeywords.length > 0 ? recomendedProductsByKeywords : recomendedProductsByCategory).map(
    (product) => <ProductItem key={product.id} product={product} onClick={() => dispatch(setSelectedProduct(product))} />
  );
  const productsIsNotEmpty = recomendedProductsToRender.length > 0;

  const handleRateProduct = (userRating: number, userId: string) => {
    if (!product && userId) return;

    const newCount = (product.ratingCount || 0) + 1;
    const newAverage = ((product.rating || 0) * (product.ratingCount || 0) + userRating) / newCount;
    setNewProduct((prev) => {
      if (!prev) {
        return { ...product, rating: newAverage, ratingCount: newCount, userRating };
      }
      return { ...prev, rating: newAverage, ratingCount: newCount, userRating };
    });

    dispatch(rateProduct({ productId: product.id, rating: userRating, userId: userId }));
  };
  const productToShow = newProduct || selectedProduct || product;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto p-2 overflow-y-auto scrollbar-hide max-h-[90vh]">
      {/* img */}
      <div className="relative overflow-hidden w-40 h-40 lg:w-120 lg:h-80">
        <img src={productToShow.img} alt={productToShow.name} className="w-full h-full object-cover rounded-xl" />

        {productToShow.isNew && <Badge position="top-2 -left-2" text={`NEW`} />}
        {productToShow.discountPercentage && <Badge position="top-2 -right-2" text={`Знижка: ${product.discountPercentage}%`} />}
      </div>
      {/*Product name */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{productToShow.name}</h2>
        <span className={`${productToShow.available ? "text-green-500" : "text-red-500"}`}>{product.available ? "В наявності" : "Товару немає"}</span>
        <ProductRating
          userId={userId}
          rating={productToShow.rating || 0}
          ratingCount={productToShow.ratingCount || 0}
          userRating={productToShow.userRating || 0}
          onRate={handleRateProduct}
        />
        <p className="mt-2">{product.description}</p>
        <p className="text-lg font-semibold mt-4">
          <ProductPrice product={productToShow} /> / за {productToShow.weight}
        </p>
        {product.available && <AddToCartButton product={productToShow} />}
      </div>
      {/* Nutrition item */}
      {product.nutritionFacts && (
        <div className="flex flex-col p-4">
          <h3 className="text-2xl mb-2">Харчові властивості</h3>
          <div className="flex flex-col space-y-1">
            {Object.entries(product.nutritionFacts).map(([key, value]) => (
              <span key={key} className=" rounded px-2  text-sm">
                <span className="flex justify-between text-[16px]">
                  <span>{key}:</span> <span>{String(value)}г</span>
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
      {/* General info */}
      {product.generalInfo && (
        <div className="flex flex-col p-4">
          <h3 className="text-2xl mb-2">Загальна інформація</h3>
          <div className="flex flex-col space-y-1">
            {Object.entries(product.generalInfo).map(([key, value]) => (
              <span key={key} className=" rounded px-2  text-sm">
                <span className="flex justify-between text-[16px]">
                  <span>{key}:</span> <span>{String(value)}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
      {/* same products */}
      <div className="overflow-x-auto p-2 text-xs col-span-2 flex flex-col justify-start ">
        {productsIsNotEmpty && <h3 className="text-2xl mb-2 pl-2">Схожі товари</h3>}
        <div className="grid grid-cols-1 lg:grid-cols-5 sm:grid-cols-2 gap-2  justify-center">{recomendedProductsToRender}</div>
      </div>
      <div className="min-w-280 pl-2">
        <ProductViewed visibleProducts={5} />
      </div>
      <div className="p-4 text-xs text-center col-span-2 flex justify-center">
        <div>
          <p>
            Незважаючи на те, що ми докладаємо всіх зусиль, щоб вся інформація про продукти була актуальною і правильною, фото товару і опис товару,
            представлені на сайті, можуть відрізнятися від товару в торговому залі. Для отримання більш точної інформації завжди звертайте увагу на
            реальний товар, читайте етикетку на продукті і не покладайтеся лише на інформацію, представлену на нашому сайті. Якщо необхідна більш
            детальна інформація про товар, будь ласка, зв'яжіться з виробником.
          </p>
        </div>
      </div>
    </div>
  );
};
