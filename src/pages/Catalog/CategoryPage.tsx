import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxTypeHook";
import { ProductItem } from "./ProductItem";

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const products = useAppSelector((state) => state.products.products);

  const filteredProducts = products.filter((p) => p.category.toLowerCase().replace(/ /g, "-") === category);
  const categoryName = category ? category.charAt(0).toUpperCase() + category?.slice(1) : category;

  return (
    <>
      <Link to="/catalog" className="p-8 pl-15 block">
        {"/"}Категорія
        {" /"}
        {categoryName}
      </Link>

      <div className="grid grid-cols-5 gap-6 pl-10">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
