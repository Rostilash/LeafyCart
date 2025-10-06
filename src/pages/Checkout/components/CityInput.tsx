import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../redux/reduxTypeHook";
import { fetchCities } from "../../../redux/slices/checkoutSlice";
import { Loader } from "../../../components/Loader";

interface City {
  description: string;
  ref: string;
}
interface CityInputProps {
  value: string;
  error: string;
  сityRef: string;
  onChange: (value: string) => void;
  onSelect: (value: City) => void;
}

export const CityInput = ({ value, onChange, onSelect, error, сityRef, debounceMs = 650 }: CityInputProps & { debounceMs?: number }) => {
  const dispatch = useAppDispatch();
  const [suggestions, setSuggestions] = useState<{ description: string; ref: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<City | null>(null);

  useEffect(() => {
    if (!value) {
      setSuggestions([]);
      setSelected(null);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await dispatch(fetchCities(value));
        setSuggestions(result.payload || []);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [value, dispatch]);

  const handleSelect = (city: City) => {
    setSelected(city);
    setSuggestions([]);
    onSelect(city);
  };

  const isSuggestionsVisible = suggestions.length > 0 && !selected;
  const isCityLoaded = сityRef.length > 0;

  return (
    <label className="block w-full relative">
      Місто (українською мовою)*
      {error && <p className="text-red-500 text-sm absolute -bottom-5 left-2">{error}</p>}
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setSelected(null);
        }}
        placeholder="Введіть місто"
        className="px-2 py-2 pr-10 w-full rounded-r custum-border-outline"
      />
      {loading && (
        <div className="absolute right-0 top-6">
          <Loader />
        </div>
      )}
      {isSuggestionsVisible && !isCityLoaded && (
        <ul role="list" className="absolute top-full left-0 w-full bg-white border rounded z-10 max-h-60 overflow-y-auto ">
          {suggestions.map((city) => (
            <li key={city.ref} className="px-2 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect(city)}>
              {city.description}
            </li>
          ))}
        </ul>
      )}
    </label>
  );
};
