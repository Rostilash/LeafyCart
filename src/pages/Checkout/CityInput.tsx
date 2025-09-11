import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { fetchCities } from "../../redux/slices/paymentSlice";

interface CityInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CityInput = ({ value, onChange }: CityInputProps) => {
  const dispatch = useAppDispatch();
  const [suggestions, setSuggestions] = useState<{ description: string; ref: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value) {
      setSuggestions([]);
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
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, dispatch]);

  const isTrue = suggestions.length > 0 && suggestions[0].description === value;

  return (
    <label className="relative">
      Місто*
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введіть місто"
        className="px-2 py-2 border w-full border-gray-300 rounded-r flex-1"
      />
      {loading && <div className="absolute top-full left-0">Завантаження...</div>}
      {!isTrue && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded z-10 max-h-60 overflow-y-auto">
          {suggestions.map((city) => (
            <li key={city.ref} className="px-2 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => onChange(city.description)}>
              {city.description}
            </li>
          ))}
        </ul>
      )}
    </label>
  );
};
