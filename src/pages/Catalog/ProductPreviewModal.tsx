import { AddToCartButton } from "../../components/Buttons/AddToCartButton";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { setSelectedProduct } from "../../redux/slices/productSlice";
import { type FoodProduct } from "../../types/productTypes";
import { ProductItem } from "./ProductItem";

export const ProductPreviewModal = ({ product }: { product: FoodProduct }) => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.products);

  const openModal = (product: FoodProduct) => {
    dispatch(setSelectedProduct(product));
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 max-w-5xl mx-auto p-4 ">
      {/* img */}
      <div className="relative overflow-hidden w-80 h-60">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover rounded-xl " />
        {product.isNew && <span className="absolute top-2 -left-2 bg-red-400 py-1 px-4 rounded-xl text-white whitespace-nowrap">NEW</span>}
      </div>
      {/*Product name */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <span className={`${product.available ? "text-green-500" : "text-red-500"}`}>{product.available ? "В наявності" : "Товару немає"}</span>
        <p className="mt-2">{product.description}</p>
        <p className="text-lg font-semibold mt-4">
          {(product.price / 100).toFixed(2)} ₴ / за {product.weight}
        </p>
        <AddToCartButton product={product} />
      </div>
      {/* about item */}
      <div className="flex flex-col p-4 ">
        <h3 className="text-2xl mb-2">Про товар</h3>
        <span className="flex justify-between">
          <span>Калорійність:</span> <span>{product.nutritionFacts?.calories}г</span>
        </span>
        <span className="flex justify-between">
          <span>Протеїн:</span> <span>{product.nutritionFacts?.protein}г</span>
        </span>
        <span className="flex justify-between">
          <span>Жири:</span> <span>{product.nutritionFacts?.fat}г</span>
        </span>
        <span className="flex justify-between">
          <span>Вуглеводи:</span> <span>{product.nutritionFacts?.carbs}г</span>
        </span>
      </div>
      {/* all info */}
      <div className=" p-4">
        <h3 className="text-2xl mb-2">Загальна інформація</h3>
        <span>
          {product.tags?.map((tag) => (
            <p key={tag}>{tag}</p>
          ))}
        </span>
      </div>
      {/* same products */}
      <h3 className="text-2xl mb-2 pl-4">Схожі товари</h3>
      <div className="overflow-x-auto p-3 text-xs col-span-2 flex justify-start">
        <div className="flex gap-4 ">
          {allProducts
            .filter((product) => product.category)
            .map((product) => (
              <ProductItem key={product.id} product={product} onClick={() => openModal(product)} />
            ))}
        </div>
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
