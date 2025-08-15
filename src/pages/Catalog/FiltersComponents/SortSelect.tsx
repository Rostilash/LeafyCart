import React from "react";
import type { FiltersPanelProps } from "../CategoryComponents/FiltersPanel";

type SortSelectProps = Omit<FiltersPanelProps, "maxCategoryPrice" | "uniqueCountries">;

export const SortSelect: React.FC<SortSelectProps> = ({ filters, onFilterChange }) => {
  return (
    <label className="text-center cursor-pointer mb-6">
      Показати спочатку
      <select value={filters.sort} onChange={(e) => onFilterChange((prev) => ({ ...prev, sort: e.target.value }))} className="border rounded">
        <option value="popular">Популярні</option>
        <option value="cheep">Дешеві</option>
        <option value="overcost">Дорогі</option>
      </select>
    </label>
  );
};
