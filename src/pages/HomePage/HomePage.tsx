import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { addToCart } from "../../redux/slices/cartSlice";
import type { FoodProduct } from "../../redux/slices/productSlice";
import type { CartItem } from "../../types/cartTypes";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.products);

  const mapFoodProductToCartItem = (product: FoodProduct): CartItem => ({
    id: product.id,
    name: product.name,
    price: product.price,
    img: product.img,
    quantity: 1,
  });

  const handleAddToCart = (product: CartItem) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  const ourProducts = allProducts.map((product) => (
    <article key={product.id} className="flex flex-col items-center justify-center w-65 bg-[var(--leafy-sage)] rounded-2xl">
      <img src={product.img} alt={product.name} className="w-50 h-50 object-cover rounded-[50%] p-2" />

      <div className="w-full bg-[var(--leafy-yelgreen)] p-4 rounded-md flex flex-col">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg" itemProp="name">
            {product.name}
          </h3>
          <span className="text-gray-700" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            <span itemProp="price">{(product.price / 100).toFixed(2)} грн</span>
          </span>
        </div>

        <button
          className="btn-primary-sm  btn_hover transition cursor-pointer mt-4 ml-auto"
          onClick={() => handleAddToCart(mapFoodProductToCartItem(product))}
        >
          Додати до кошику
        </button>
      </div>
    </article>
  ));

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

          {/* <button className="btn-primary btn_hover transition cursor-pointer">В магазин зараз</button> */}
          <Link to="/catalog" className="btn-primary btn_hover transition cursor-pointer">
            В магазин зараз
          </Link>
        </div>

        <div className="mt-8 md:mt-0 md:ml-12 ">
          <img src="/vagitables.png" alt="vegetable plate" className="w-120 h-auto " />
        </div>
      </div>

      <div className="bg-[var(--leafy-light)]   min-h-[calc(100vh-685px)]">
        <h1 className="title-xl p-4 text-center ">Рекомендовані продукти</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10 justify-items-center">{ourProducts}</div>
      </div>
    </>
  );
};
