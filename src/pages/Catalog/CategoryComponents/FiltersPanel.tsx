import type { Filters } from "../../../hook/useCategoryFilter";
import { ClearFilters } from "../FiltersComponents/ClearFilters";
import { CountryFilterList } from "../FiltersComponents/CountryFilterList";
import { InStockCheckbox } from "../FiltersComponents/InStockCheckbox";
import { PriceRange } from "../FiltersComponents/PriceRange";
import { SortSelect } from "../FiltersComponents/SortSelect";

export type FiltersPanelProps = {
  filters: Filters;
  onFilterChange: React.Dispatch<React.SetStateAction<Filters>>;
  maxCategoryPrice: number;
  uniqueCountries?: (string | undefined)[];
};

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ filters, onFilterChange, maxCategoryPrice, uniqueCountries }) => {
  return (
    <div className="bg-[var(--leafy-bg)] flex flex-col space-y-2 pl-4 ">
      <h3 className="text-center title-s">Фільтри</h3>
      {/* Select sort */}
      <SortSelect filters={filters} onFilterChange={onFilterChange} />

      {/* InStockOnly */}
      <InStockCheckbox filters={filters} onFilterChange={onFilterChange} />

      {/* Price */}
      <PriceRange filters={filters} onFilterChange={onFilterChange} maxCategoryPrice={maxCategoryPrice} />

      {/* By Country */}
      <CountryFilterList filters={filters} onFilterChange={onFilterChange} uniqueCountries={uniqueCountries} />

      <ClearFilters onFilterChange={onFilterChange} />
    </div>
  );
};
