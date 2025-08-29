import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { getOrdersByUser, saveOrder } from "../../redux/slices/orderSlice";
import { convertMoney } from "../../utils/convertMoney";
import { generateDataAndSignature } from "../../utils/liqpay";
import { FormField } from "../../pages/Admin/Products/FormSlices/FormField";
import AuthPage from "../AuthComponents/AuthPage";
import { Loader } from "../Loader";
import { clearCart } from "../../redux/slices/cartSlice";

type ConfirmBuyoutInfoProps = {
  totalPrice: number;
  totalDiscount?: number;
  onClose: () => void;
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

export const ConfirmBuyoutInfo = ({ totalPrice, totalDiscount, onClose }: ConfirmBuyoutInfoProps) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.uid);
  const cartItems = useAppSelector((state) => state.cart.items);
  const allOrders = useAppSelector((state) => state.order.all_orders);
  const loading = useAppSelector((state) => state.order.loading);

  const isCartEmpty = cartItems.length > 0;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", address: "", city: "" });

  useEffect(() => {
    if (allOrders && allOrders.length > 0) {
      const lastOrder = allOrders.at(-1);
      setFormData({
        name: lastOrder?.name || "",
        email: lastOrder?.email || "",
        address: lastOrder?.address || "",
        city: lastOrder?.city || "",
      });
    }
  }, [allOrders]);

  useEffect(() => {
    if (userId) {
      dispatch(getOrdersByUser(userId));
    }
  }, [dispatch, userId]);

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", address: "", city: "" };

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

    if (formData.city.trim().length < 4) {
      newErrors.city = "Адреса має бути не менше 8 символів";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const discount = (totalDiscount ?? 0) / 100;
  const delivery = 0;
  const total = totalPrice / 100 - discount + delivery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLiqPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // const privateKey = "sandbox_private_key";
    // const publicKey = "sandbox_public_key";

    // const params = {
    //   version: "3",
    //   action: "pay",
    //   amount: Number(total).toFixed(2),
    //   currency: "UAH",
    //   description: "Тестова оплата",
    //   order_id: `order_${Date.now()}`,
    //   result_url: "http://localhost:3000/success",
    //   server_url: "http://localhost:3000/callback",
    //   sandbox: "1",
    // };

    // const { data, signature } = generateDataAndSignature(params, privateKey, publicKey);

    // const liqpay = (window as any).LiqPayCheckout.init({
    //   data,
    //   signature,
    //   embedTo: "#liqpay",
    //   mode: "popup",
    // });

    // liqpay.on("liqpay.callback", function (response: any) {
    //   console.log("LiqPay callback:", response);

    //   if (response.status === "success" || response.status === "sandbox") {
    //     const newData = {
    //       name: formData.name,
    //       email: formData.email,
    //       city: formData.city,
    //       price: Number(total.toFixed(2)),
    //       cartItems: cartItems,
    //       paymentId: response.payment_id || null,
    //       paymentStatus: response.status,
    //     };

    // dispatch(saveOrder(newData));
    dispatch(saveOrder({ ...formData, price: Number(total.toFixed(2)), cartItems: cartItems, paymentId: "123456", paymentStatus: "good" }));
    setFormData({ name: "", email: "", address: "", city: "" });
    //   } else {
    //     console.error("Payment failed or cancelled", response);
    //   }
    // });

    // liqpay.on("liqpay.ready", function () {
    //   console.log("LiqPay ready");
    // });

    // liqpay.on("liqpay.close", function () {
    //   console.log("LiqPay closed");
    // });
    dispatch(clearCart());
    onClose();
  };

  return (
    <>
      {!userId && (
        <div className="max-w-140">
          <AuthPage />
          <p className="text-xs text-gray-500 text-center">
            Для збареження інформаці та отримання данних, що до вашого замовлення ви повинні зарєструватися, або увійти у свій кабінет. Після
            замовленя товару з вами мають звязатися і підтвердити ваше замовлення.
          </p>
        </div>
      )}
      <h2 className="title-l pl-2">Підтвердження замовлення</h2>
      <div
        className="
            mx-auto p-2 
            grid grid-cols-1 lg:grid-cols-2 gap-8
            min-h-screen lg:min-h-0
            overflow-y-auto lg:overflow-visible
          "
      >
        {/* Left side */}
        <form onSubmit={handleLiqPay} className="space-y-4 ">
          <FormField name="name" title="Ім’я" value={formData.name} onChange={handleChange} error={errors.name} />

          <FormField name="city" title="Місто" value={formData.city} onChange={handleChange} error={errors.city} />

          <FormField name="address" title="Адреса" value={formData.address} onChange={handleChange} error={errors.address} />

          <FormField inputType="email" name="email" title="Email" value={formData.email} onChange={handleChange} error={errors.email} />

          {loading && <Loader />}
          <div className="mb-12"></div>

          <button type="submit" className="btn-primary btn_hover" disabled={!isCartEmpty}>
            Оплатити через LiqPay
          </button>
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
    </>
  );
};
