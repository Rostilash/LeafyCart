import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { getProducts } from "../../redux/slices/productSlice";
import { getFilteredProductItems } from "../../utils/filters";
import { ProductViewed } from "../Catalog/ProductViewed";
import { HeroSection } from "./components/HeroSection";
import { ProductSection } from "./components/ProductSection";
import { Footer } from "../../components/Footer";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products: allProducts, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const recommendedProducts = getFilteredProductItems(allProducts, (p) => !!p.isRecommended && p.available, dispatch);

  const discountedProducts = getFilteredProductItems(
    allProducts,
    (p) => !!p.discountPercentage && (p.discountPercentage ?? 0) > 0 && p.available,
    dispatch
  );

  const newProducts = getFilteredProductItems(allProducts, (p) => !!p.isNew && p.available, dispatch);

  return (
    <>
      <HeroSection />
      <ProductSection title="Рекомендовані" products={recommendedProducts} loading={loading} error={error} emptyMessage="Новинок ще немає" />
      <ProductSection title="Новинки" products={newProducts} loading={loading} error={error} emptyMessage="Новинок поки не має..." />
      <ProductSection title="Акції" products={discountedProducts} loading={loading} error={error} emptyMessage="Зараз немає акцій" />
      <div className="px-4">
        <ProductViewed visibleProducts={7} />
      </div>
      <Footer />
    </>
  );
};
