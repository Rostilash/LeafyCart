import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";

export const Products = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.products);

  const products = allProducts.map((product) => {
    const { id, name, category, description, price } = product;
    return (
      <>
        <div className="grid grid-cols-7 items-center justify-center border-b" key={product.id}>
          <span>{id}</span>
          <h3>{name}</h3>
          <span>{category}</span>
          <p>{description}</p>
          <span>{price}</span>
          <button className="p-2 border cursor-pointer bg-blue-300 ">Редагувати</button>
          <button className="p-2 border cursor-pointer bg-red-300">Видалити</button>
        </div>
      </>
    );
  });
  return (
    <section className="p-10">
      <div className="grid grid-cols-7 border-b">
        <span>№</span>
        <h3>Назва</h3>
        <span>Категорія</span>
        <p>Опис</p>
        <span>Ціна</span>
      </div>
      {products}
    </section>
  );
};
