import type React from "react";
import { Loader } from "../../../components/Loader";
import type { JSX } from "react";

interface PruductSectionProps {
  title: string;
  products: JSX.Element[];
  loading: boolean;
  error: string | null;
  emptyMessage: string;
}

export const ProductSection: React.FC<PruductSectionProps> = ({ title, products, loading, error, emptyMessage }) => {
  return (
    <div className="min-h-[calc(100vh-685px)] px-4">
      {/* Recomended products */}
      <h1 className="title-xl p-4 text-center">{title}</h1>
      {loading ? (
        <div className="flex justify-center text-center">
          <Loader />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 p-10">Помилка: {error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 p-10">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 justify-items-center">{products}</div>
      )}
    </div>
  );
};
