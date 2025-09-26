import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { useEffect, useMemo } from "react";
import { fetchWerhouses } from "../../../redux/slices/checkoutSlice";

interface WarehouseSelectProps {
  cityRef: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
}

export const WarehouseSelect = ({ cityRef, value, onChange, error }: WarehouseSelectProps) => {
  const dispatch = useAppDispatch();
  const warehouses = useAppSelector((state) => state.payment.nova_adress);
  const loadingWarehouses = useAppSelector((state) => state.payment.loadingWarehouses);

  useEffect(() => {
    onChange("");
  }, [cityRef]);

  useEffect(() => {
    if (!cityRef) return;

    const getWarehouses = async () => {
      try {
        await dispatch(fetchWerhouses(cityRef)).unwrap();
      } catch (err) {
        console.error(err);
      }
    };

    getWarehouses();
  }, [cityRef, dispatch]);

  const filteredWarehouses = useMemo(() => {
    if (loadingWarehouses) return [];
    return warehouses.filter((w) => w.description.includes("Відділення"));
  }, [warehouses, loadingWarehouses]);

  const hasWarehouses = filteredWarehouses.length > 0;

  return (
    <label htmlFor="" className={`${cityRef ? "block" : "hidden"} block w-full`}>
      Оберіть відділення
      {loadingWarehouses && <p className="text-sm text-gray-500">Завантаження відділень...</p>}
      {hasWarehouses ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} className="px-2 py-2 border rounded w-full border-gray-300">
          <option value="">{loadingWarehouses ? "Завантаження " : "Оберіть відділення"}</option>
          {filteredWarehouses.map((wh) => (
            <option key={wh.ref} value={wh.description}>
              {wh.description}
            </option>
          ))}
        </select>
      ) : !loadingWarehouses ? (
        <p>Відділення не знайдено для цього міста</p>
      ) : null}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </label>
  );
};
