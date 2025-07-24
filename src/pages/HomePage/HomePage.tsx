import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxTypeHook";
import { ProductItem } from "./../Catalog/ProductItem";

export const HomePage = () => {
  const allProducts = useAppSelector((state) => state.products.products);
  const ourProducts = allProducts.map((product) => <ProductItem key={product.id} product={product} />);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-around items-center bg-[var(--leafy-light)] p-10">
        <div className="max-w-md text-left space-y-12">
          <h1 className="text-6xl font-bold leading-tight">
            Свіжі,
            <br />
            органічні
            <br />
            продукти
            <br />
            Доставлені
            <br />
            до ваших дверей,
          </h1>
          <Link to="/catalog" className="btn-primary btn_hover transition cursor-pointer">
            В магазин зараз
          </Link>
        </div>

        <div className="mt-8 md:mt-0 md:ml-12 ">
          <img src="/vagitables.png" alt="vegetable plate" className="w-120 h-auto " />
        </div>
      </div>

      <div className="bg-[var(--leafy-bg)]   min-h-[calc(100vh-685px)]">
        {/* Recomended products */}
        <h1 className="title-xl p-4 text-center ">Рекомендовані продукти</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 p-10 justify-items-center ">{ourProducts}</div>
      </div>
    </>
  );
};
