import { ProductItem } from "../ProductItem";
import { Pagination } from "../../../components/Pagination";
import type { FoodProduct } from "../../../types/productTypes";
import { useState } from "react";

interface CategoryProdProps {
  filteredProducts: FoodProduct[];
  openModal: (product: FoodProduct) => void;
}

export const CategoryProducts = ({ filteredProducts, openModal }: CategoryProdProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col gap-4 px-2">
      {/* Products */}
      {paginatedProducts.length < 1 && <div className="w-full text-center text-gray-500 mt-10">В данній категорії немає товарів...</div>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-2">
        {paginatedProducts.map((product) => (
          <ProductItem key={product.id} product={product} onClick={() => openModal(product)} />
        ))}
      </div>

      {/* Pagination */}
      {/* Was fullyFiltered in useCategotyFilter need to test with it */}
      <Pagination totalItems={filteredProducts.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};
