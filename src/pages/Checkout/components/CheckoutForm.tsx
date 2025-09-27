import type { OrderFormData } from "../../../redux/slices/orderSlice";
import type { ChangeEvent } from "react";
import { FormField } from "../../Admin/Products/FormSlices/FormField";
import { CityInput } from "./CityInput";
import { WarehouseSelect } from "./WarehouseSelect";
import { FormRadio } from "../../Admin/Products/FormSlices/FormRadio";
import { Loader } from "../../../components/Loader";
import { useAppSelector } from "../../../redux/reduxTypeHook";

interface CheckoutFormProps {
  handleLiqPay: (e: React.FormEvent) => void;
  setFormData: (data: OrderFormData) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  formData: OrderFormData;
  hasCartItems: boolean;
  errors: Partial<Record<keyof OrderFormData, string>>;
}

const orderFields = [
  { name: "name", title: "Ім’я", required: true },
  { name: "last_name", title: "Призвіще", required: true },
  { name: "mid_name", title: "По батькові", required: true },
  { name: "phone_number", title: "Номер телефону", inputType: "tel", required: true, className: "px-2 py-2 border border-gray-300 rounded-r flex-1" },
  { name: "email", title: "Email", inputType: "email", required: true },
];

export const CheckoutForm = ({ handleLiqPay, handleChange, setFormData, formData, hasCartItems, errors }: CheckoutFormProps) => {
  const { loading } = useAppSelector((state) => state.order);

  return (
    <form onSubmit={handleLiqPay} className="flex flex-col gap-4">
      {orderFields.map((o) => (
        <FormField
          key={o.name}
          {...o}
          value={formData[o.name as keyof typeof formData]}
          onChange={handleChange}
          error={errors[o.name as keyof typeof errors] as string}
        />
      ))}

      <CityInput
        value={formData.city}
        onChange={(val) =>
          setFormData({
            ...formData,
            city: val,
            cityRef: "",
            warehouse: "",
          })
        }
        onSelect={(city) =>
          setFormData({
            ...formData,
            city: city.description,
            cityRef: city.ref,
            warehouse: "",
          })
        }
        сityRef={formData.cityRef || ""}
        error={errors.city as string}
      />

      <WarehouseSelect
        cityRef={formData.cityRef}
        value={formData.warehouse}
        onChange={(val) => setFormData({ ...formData, warehouse: val })}
        error={errors.warehouse as string}
      />

      <div className="flex flex-col gap-2">
        <span className="text-x">Оберіть спосіб оплати</span>
        <FormRadio
          key={"cod"}
          name="payment"
          value="cod"
          checked={formData.payment === "cod"}
          onChange={handleChange}
          title="У віділенні"
          img="nova-post.png"
          size={40}
        />

        <FormRadio
          key={"liqpay"}
          name="payment"
          value="liqpay"
          checked={formData.payment === "liqpay"}
          onChange={handleChange}
          title="Оплатити через LiqPay"
          img="liqpay.png"
          size={40}
        />
      </div>

      <button type="submit" className="btn-primary btn_hover mt-8" disabled={!hasCartItems || !!loading}>
        {formData.payment === "cod" ? "Оплатити у віділенні" : "Оплатити через LiqPay"} {loading && <Loader />}
      </button>
    </form>
  );
};
