import React from "react";
import type { FiltersPanelProps } from "../CategoryComponents/FiltersPanel";

type CountryFilterListProps = Omit<FiltersPanelProps, "maxCategoryPrice">;

export const CountryFilterList: React.FC<CountryFilterListProps> = ({ filters, onFilterChange, uniqueCountries }) => {
  return (
    <>
      {uniqueCountries && uniqueCountries.length > 0 && (
        <>
          <h3 className="text-center title-s">Країни</h3>
          {uniqueCountries
            .filter((c): c is string => Boolean(c))
            .map((country) => (
              <label htmlFor={`countryFilter-${country}`} className="inline-flex items-center gap-2 cursor-pointer" key={country}>
                <input
                  id={`countryFilter-${country}`}
                  type="checkbox"
                  checked={filters.countryFilter === country}
                  onChange={(e) => {
                    const newValue = e.target.checked ? country : null;
                    onFilterChange((prev) => ({
                      ...prev,
                      countryFilter: newValue,
                    }));
                  }}
                />
                {country}
              </label>
            ))}
        </>
      )}
    </>
  );
};
