import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { saveOrder } from "../../redux/slices/authSlice";
import { useConvertMoney } from "../../utils/useConvertMoney";

type ConfirmBuyoutInfoProps = {
  totalPrice: number;
  totalDiscount?: number;
};

export const ConfirmBuyoutInfo = ({ totalPrice, totalDiscount }: ConfirmBuyoutInfoProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", address: "" });

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", address: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я обов'язкове";
      valid = false;
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Некоректний email";
      valid = false;
    }

    if (formData.address.trim().length < 10) {
      newErrors.address = "Адреса має бути не менше 10 символів";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const discount = (totalDiscount ?? 0) / 100;
  const delivery = 0;
  const total = totalPrice / 100 - discount + delivery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const newData = { ...formData, price: total };
    // need to upgrade in future
    console.log(newData);
    // dispatch(saveOrder(newData));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-2 gap-8">
      {/* Left side */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold block">Ім’я</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="font-semibold block">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="font-semibold block">Адреса</label>
          <textarea name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full border px-3 py-2 rounded" />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {loading && <p>Завантаження...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Оформити замовлення
        </button>
      </form>

      {/* Right side */}
      <div className="bg-gray-100 p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Підсумок замовлення</h2>
        <div className="flex justify-between">
          <span>Ціна:</span>
          <span>{useConvertMoney(totalPrice)} грн</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Знижка:</span>
            <span>-{discount.toFixed(2)} грн</span>
          </div>
        )}
        {delivery > 0 && (
          <div className="flex justify-between">
            <span>Доставка:</span>
            <span>{delivery.toFixed(2)} грн</span>
          </div>
        )}
        <hr />
        <div className="flex justify-between font-bold text-lg">
          <span>Всього:</span>
          <span>{total.toFixed(2)} грн</span>
        </div>
      </div>
    </div>
  );
};
