import { useState } from "react";

type Filters = {
  minPrice: string;
  maxPrice: string;
  inStockOnly: boolean;
  range: number;
  sort: string;
};

type FiltersPanelProps = {
  onFilterChange: (filters: Filters) => void;
  maxCategoryPrice: number;
};

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ onFilterChange, maxCategoryPrice }) => {
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("");
  // const [range, setRange] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("popular");

  const handleApply = () => {
    onFilterChange({
      minPrice,
      maxPrice,
      inStockOnly,
      range: 0,
      sort,
    });
  };
  const maxPriceRounded = Math.ceil(maxCategoryPrice / 1000);

  return (
    <div className="bg-[var(--leafy-bg)] flex flex-col space-y-6 pl-4">
      <h3 className="text-center title-s">Фільтри</h3>
      {/* Select sort */}
      <label className="text-center cursor-pointer">
        Показати спочатку
        <select
          value={sort}
          onChange={(e) => {
            const value = e.target.value;
            setSort(value);
            onFilterChange({
              minPrice,
              maxPrice,
              range: 0,
              inStockOnly,
              sort: value,
            });
          }}
        >
          <option value="popular">Популярні</option>
          <option value="cheep">Дешеві</option>
          <option value="overcost">Дорогі</option>
        </select>
      </label>
      {/* InStockOnly */}
      <label htmlFor="inStock" className="inline-flex items-center gap-2 cursor-pointer">
        <input
          id="inStock"
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => {
            const isChecked = e.target.checked;
            setInStockOnly(isChecked);
            onFilterChange({
              minPrice,
              maxPrice,
              range: 0,
              sort,
              inStockOnly: isChecked,
            });
          }}
        />
        Тільки в наявності
      </label>
      {/* Price */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Ціна, ₴ </label>

        <input
          type="range"
          min="0"
          max={maxPriceRounded * 10}
          step="10"
          value={Math.min(Number(maxPrice) || 0, maxPriceRounded * 10)}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="від"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 w-16 border rounded text-center"
          />
          {" - "}
          <input
            type="text"
            placeholder="до"
            value={maxPrice}
            max={maxCategoryPrice / 100}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 w-16 border rounded text-center"
          />
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleApply}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
