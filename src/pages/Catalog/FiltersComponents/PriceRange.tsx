import React from "react";
import Slider from "@mui/material/Slider";
import { Box, Typography } from "@mui/material";
import type { FiltersPanelProps } from "../CategoryComponents/FiltersPanel";

type PriceRangeProps = Omit<FiltersPanelProps, "uniqueCountries">;

export const PriceRange: React.FC<PriceRangeProps> = ({ filters, onFilterChange, maxCategoryPrice }) => {
  const maxPriceRounded = Math.ceil(maxCategoryPrice / 1000);

  const handleChange = (_event: Event, newValue: number | number[]): void => {
    if (Array.isArray(newValue)) {
      onFilterChange((prev) => ({
        ...prev,
        minPrice: String(newValue[0]),
        maxPrice: String(newValue[1]),
      }));
    }
  };

  return (
    <Box className="flex flex-col gap-2 px-4">
      <Typography variant="h6" align="center">
        Ціна, ₴
      </Typography>

      <Slider
        value={[Number(filters.minPrice) || 0, Number(filters.maxPrice) || maxPriceRounded * 10]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={maxPriceRounded * 10}
        step={10}
        valueLabelFormat={(value) => `${value}`}
        aria-labelledby="range-slider"
      />

      <Box className="flex items-center justify-between gap-2">
        <input
          type="text"
          placeholder="від"
          value={filters.minPrice}
          onChange={(e) =>
            onFilterChange((prev) => ({
              ...prev,
              minPrice: e.target.value,
            }))
          }
          className="p-2 w-16 border rounded text-center"
        />
        {" - "}
        <input
          type="text"
          placeholder="до"
          value={filters.maxPrice}
          max={maxCategoryPrice / 100}
          onChange={(e) =>
            onFilterChange((prev) => ({
              ...prev,
              maxPrice: e.target.value,
            }))
          }
          className="p-2 w-16 border rounded text-center"
        />
      </Box>
    </Box>
  );
};
