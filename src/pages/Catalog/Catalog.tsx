import { Link } from "react-router-dom";
import { categoryTree } from "../../utils/categoryTree";

export const Catalog = () => {
  return (
    <section>
      {categoryTree.map((cat) => (
        <div className="px-4 sm:px-6 lg:px-12 p-2" key={cat.title}>
          {/* Category title */}
          <h3 className=" text-xl sm:text-2xl md:text-3x text-left font-bold py-2">{cat.title}</h3>
          {/* Subcategories maping here */}
          <ul className=" grid gap-6 sm:gap-8 md:gap-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {cat.subcategories.map((c) => (
              <li key={c.name} className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300">
                <Link to={`/catalog/${c.name.toLowerCase().replace(/ /g, "-")}`}>
                  <img
                    src={c.img || "/leaf-icon.png"}
                    alt={c.name}
                    className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-xl sm:text-2xl md:text-3xl drop-shadow-lg">
                    {c.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
