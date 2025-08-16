import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { ProductItem } from "./../Catalog/ProductItem";
import { getProducts, setSelectedProduct } from "../../redux/slices/productSlice";
import { useEffect } from "react";
import { Loader } from "../../components/Loader";
import { ProductViewed } from "../Catalog/ProductViewed";
import { Footer } from "../../components/Footer";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products: allProducts, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const recommendedProducts = allProducts
    .filter((product) => product.isRecommended && product.available === true)
    .slice(0, 12)
    .map((product) => <ProductItem key={product.id} product={product} onClick={() => dispatch(setSelectedProduct(product))} />);

  return (
    <>
      <div className="hidden md:flex flex-col md:flex-row justify-center items-center bg-[var(--leafy-sage)] p-2 lg:px-10 gap-30">
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
          <img src="/freshProducts.png" alt="vegetable plate" className="w-50 scale-120 lg:w-120 h-auto " />
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-10 justify-items-center">{recommendedProducts}</div>
        )}
        <div className="w-scren pl-12 pr-10">
          <ProductViewed visibleProducts={6} />
        </div>

        <Footer />
      </div>
    </>
  );
};
