import React from "react";

import type { FiltersPanelProps } from "../CategoryComponents/FiltersPanel";

type InStockCheckProps = Omit<FiltersPanelProps, "maxCategoryPrice" | "uniqueCountries">;

export const InStockCheckbox: React.FC<InStockCheckProps> = ({ filters, onFilterChange }) => {
  return (
    <label htmlFor="inStock" className="inline-flex items-center gap-2 cursor-pointer">
      <input
        id="inStock"
        type="checkbox"
        checked={filters.inStockOnly}
        onChange={(e) => {
          onFilterChange((prev) => ({ ...prev, inStockOnly: e.target.checked }));
        }}
      />
      Тільки в наявності
    </label>
  );
};
