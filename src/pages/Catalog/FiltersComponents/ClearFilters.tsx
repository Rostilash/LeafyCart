import React from "react";
import type { Filters } from "../../../hook/useCategoryFilter";

type ClearFiltersProps = {
  onFilterChange: React.Dispatch<React.SetStateAction<Filters>>;
};

export const ClearFilters = ({ onFilterChange }: ClearFiltersProps) => {
  const handleClear = () => {
    onFilterChange({ minPrice: "", maxPrice: "", inStockOnly: false, countryFilter: null as string | null, range: 0, sort: "popular" });
  };
  return (
    <button className="btn-primary-sm w-40 btn_hover" onClick={handleClear}>
      Очистити Фільтр
    </button>
  );
};
