import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { getProducts } from "../../redux/slices/productSlice";
import { useEffect } from "react";
import { Loader } from "../../components/Loader";
import { ProductViewed } from "../Catalog/ProductViewed";
import { Footer } from "../../components/Footer";
import { getFilteredProductItems } from "../../utils/filters";

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
      <div className="hidden md:flex flex-col md:flex-row justify-center items-center bg-[var(--leafy-sage)]">
        <div className=" max-w-2xl text-left space-y-12 ">
          <h1 className="text-6xl font-bold leading-tight ">
            Свіжі
            <br />
            органічні продукти
            <br />
            Доставлені
            <br />
            до ваших дверей
          </h1>
          <Link to="/catalog" className="btn-primary btn_hover transition cursor-pointer">
            В магазин зараз
          </Link>
        </div>

        <div className="mt-8 md:mt-0 md:ml-12 ">
          <img src="/freshProducts.png" alt="vegetable plate" className="w-50 scale-100 lg:w-120 h-auto " />
        </div>
      </div>

      <div className="bg-[var(--leafy-bg)] min-h-[calc(100vh-685px)]">
        {/* Recomended products */}
        <h1 className="title-xl p-4 text-center">Рекомендовані</h1>
        {loading ? (
          <div className="flex justify-center text-center">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 p-10">Помилка: {error}</p>
        ) : recommendedProducts.length === 0 ? (
          <p className="text-center text-gray-500 p-10">Новинок ще немає</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 justify-items-center">
            {recommendedProducts}
          </div>
        )}
      </div>

      <div className="bg-[var(--leafy-bg)]">
        {/* New */}
        <h1 className="title-xl p-4 text-center">Новинки</h1>
        {loading ? (
          <div className="flex justify-center text-center">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 p-10">Помилка: {error}</p>
        ) : newProducts.length === 0 ? (
          <p className="text-center text-gray-500 p-10">Новинок поки не має...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 justify-items-center">{newProducts}</div>
        )}
      </div>

      <div className="bg-[var(--leafy-bg)]">
        {/* Discount */}
        <h1 className="title-xl p-4 text-center">Акції</h1>
        {loading ? (
          <div className="flex justify-center text-center">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 p-10">Помилка: {error}</p>
        ) : discountedProducts.length === 0 ? (
          <p className="text-center text-gray-500 p-10">Зараз немає акцій</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 justify-items-center">
            {discountedProducts}
          </div>
        )}
      </div>

      <ProductViewed visibleProducts={7} />

      <Footer />
    </>
  );
};
