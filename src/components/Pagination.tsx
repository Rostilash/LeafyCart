import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`cursor-pointer p-2 rounded ${currentPage === 1 ? "opacity-0 cursor-not-allowed" : "hover:bg-gray-100"}`}
      >
        <ArrowLeft />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${
            page === currentPage
              ? "bg-[var(--leafy-dark)] text-white border-none"
              : "bg-white text-black cursor-pointer hover:bg-[var(--leafy-moss)] "
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`cursor-pointer p-2 rounded ${currentPage === totalPages ? "opacity-0 cursor-not-allowed" : "hover:bg-gray-100"}`}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
