import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { saveOrder } from "../../redux/slices/authSlice";
import { convertMoney } from "../../utils/convertMoney";
import { generateDataAndSignature } from "../../utils/liqpay";

type ConfirmBuyoutInfoProps = {
  totalPrice: number;
  totalDiscount?: number;
};
interface LiqPayResponse {
  status: string;
  [key: string]: unknown;
}

interface LiqPayCheckoutInstance {
  init: (config: { data: string; signature: string; embedTo?: string; mode?: string }) => {
    on: (event: string, callback: (response: LiqPayResponse) => void) => void;
  };
}

declare global {
  interface Window {
    LiqPayCheckout: LiqPayCheckoutInstance;
  }
}
export const ConfirmBuyoutInfo = ({ totalPrice, totalDiscount }: ConfirmBuyoutInfoProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.items);
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

    if (formData.address.trim().length < 8) {
      newErrors.address = "Адреса має бути не менше 8 символів";
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

  const handleLiqPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const privateKey = "sandbox_private_key";
    const publicKey = "sandbox_public_key";

    const params = {
      version: "3",
      action: "pay",
      amount: Number(total).toFixed(2),
      currency: "UAH",
      description: "Тестова оплата",
      order_id: `order_${Date.now()}`,
      result_url: "http://localhost:3000/success",
      server_url: "http://localhost:3000/callback",
      sandbox: "1",
    };

    const { data, signature } = generateDataAndSignature(params, privateKey, publicKey);

    const liqpay = (window as any).LiqPayCheckout.init({
      data,
      signature,
      embedTo: "#liqpay",
      mode: "popup",
    });

    liqpay.on("liqpay.callback", function (response: any) {
      console.log("LiqPay callback:", response);

      if (response.status === "success" || response.status === "sandbox") {
        const newData = {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          price: Number(total.toFixed(2)),
          cartItems: cartItems,
          paymentId: response.payment_id || null,
          paymentStatus: response.status,
        };

        dispatch(saveOrder(newData));
        setFormData({ name: "", email: "", address: "" });
      } else {
        console.error("Payment failed or cancelled", response);
      }
    });

    liqpay.on("liqpay.ready", function () {
      console.log("LiqPay ready");
    });

    liqpay.on("liqpay.close", function () {
      console.log("LiqPay closed");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-2 gap-8">
      {/* Left side */}
      <form onSubmit={handleLiqPay} className="space-y-4">
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-600">
          Оплатити через LiqPay
        </button>
        {/* <button type="button" onClick={handleLiqPay} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Оплатити через LiqPay
        </button> */}
      </form>

      {/* Right side */}
      <div className="bg-gray-100 p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Підсумок замовлення</h2>
        <div className="flex justify-between">
          <span>Ціна:</span>
          <span>{convertMoney(totalPrice)} грн</span>
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
