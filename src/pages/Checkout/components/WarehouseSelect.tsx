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
        <select value={value} onChange={(e) => onChange(e.target.value)} className="py-2 rounded w-full custum-border-outline">
          <option value="">{loadingWarehouses ? "Завантаження " : "Оберіть відділення"}</option>
          {filteredWarehouses.map((wh) => (
            <option key={wh.ref} value={wh.description}>
              {wh.description}
            </option>
          ))}
        </select>
      ) : !loadingWarehouses ? (
        <p className="text-red-300 text-sm">Нажаль відділення для цього міста не знайдено. Спробуйте ввести інше місто.</p>
      ) : null}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </label>
  );
};
