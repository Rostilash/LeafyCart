import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { getOrdersByUser, saveOrder, type OrderFormData } from "../../redux/slices/orderSlice";
import { convertMoney } from "../../utils/convertMoney";
// import { generateDataAndSignature } from "../../utils/liqpay";
import { FormField } from "../../pages/Admin/Products/FormSlices/FormField";
import AuthPage from "../AuthComponents/AuthPage";
import { Loader } from "../Loader";
import { clearCart } from "../../redux/slices/cartSlice";
import { FormRadio } from "../../pages/Admin/Products/FormSlices/FormRadio";

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

const initialForm: OrderFormData = {
  name: "",
  email: "",
  address: "",
  city: "",
  payment: "",
  last_name: "",
  mid_name: "",
  phone_number: "",
};

const orderFields = [
  { name: "name", title: "Ім’я", required: true },
  { name: "last_name", title: "Призвіще", required: true },
  { name: "mid_name", title: "По батькові", required: true },
  { name: "city", title: "Місто (українською мовою)", required: true },
  { name: "address", title: "Адреса", required: true },
  { name: "phone_number", title: "Номер телефону", inputType: "tel", required: true, className: "px-2 py-2 border border-gray-300 rounded-r flex-1" },
  { name: "email", title: "Email", inputType: "email", required: true },
];

export const ConfirmBuyoutInfo = ({ totalPrice, totalDiscount }: ConfirmBuyoutInfoProps) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.uid);
  const cartItems = useAppSelector((state) => state.cart.items);
  const { user_orders, successMessage, error, loading } = useAppSelector((state) => state.order);

  const hasCartItems = cartItems.length > 0;

  const [formData, setFormData] = useState<OrderFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  useEffect(() => {
    if (user_orders && user_orders.length > 0) {
      const lastOrder = user_orders.at(-1);
      setFormData({
        name: lastOrder?.name || "",
        email: lastOrder?.email || "",
        address: lastOrder?.address || "",
        city: lastOrder?.city || "",
        payment: lastOrder?.payment || "",
        last_name: lastOrder?.last_name || "",
        mid_name: lastOrder?.mid_name || "",
        phone_number: lastOrder?.phone_number || "",
      });
    }
  }, [user_orders]);

  useEffect(() => {
    if (userId) {
      dispatch(getOrdersByUser(userId));
    }
  }, [dispatch, userId]);

  const validate = () => {
    let valid = true;
    const newErrors = initialForm;

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я обов'язкове";
      valid = false;
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Некоректний email";
      valid = false;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Некоректний email";
      valid = false;
    }

    if (formData.address.trim().length < 8) {
      newErrors.address = "Адреса має бути не менше 8 символів";
      valid = false;
    }

    if (formData.city.trim().length < 4) {
      newErrors.city = "Адреса має бути не менше 4 символів";
      valid = false;
    }

    if (formData.phone_number) {
      const phonePattern = /^\+380\d{9}$/;
      if (!phonePattern.test(formData.phone_number.toString())) {
        newErrors.phone_number = "Номер телефону повинен починатися з +380 та містити 9 цифр після";
        valid = false;
      }
    } else {
      newErrors.phone_number = "Номер телефону обов'язковий";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const discount = (totalDiscount ?? 0) / 100;
  const delivery = 0;
  const total = totalPrice / 100 - discount + delivery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    if (name === "phone_number") {
      value = value.replace(/\D/g, "");
      if (value.length > 9) value = value.slice(0, 9);
    }

    setFormData({ ...formData, [e.target.name]: value });
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
    const result = await dispatch(
      saveOrder({ ...formData, price: Number(total.toFixed(2)), cartItems: cartItems, paymentId: "123456", paymentStatus: "good" })
    );
    if (saveOrder.fulfilled.match(result) && result.payload === "ok") {
      alert("✅ Замовлення оформлене успішно!");
      // або відкрити модалку, або перенаправити на сторінку подяки
    }

    if (saveOrder.rejected.match(result)) {
      alert("❌ Сталася помилка: " + result.payload);
    }
    setFormData(initialForm);
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

      <div
        className="
            mx-auto p-2 
            grid grid-cols-1 lg:grid-cols-2 gap-8
            min-h-[screen] lg:min-h-0
            overflow-y-auto lg:overflow-visible
            sm:pt-10
          "
      >
        {/* Left side */}
        <form onSubmit={handleLiqPay} className="space-y-4 ">
          {orderFields.map((o) => (
            <FormField
              key={o.name}
              {...o}
              value={formData[o.name as keyof typeof formData]}
              onChange={handleChange}
              error={errors[o.name as keyof typeof errors]}
            />
          ))}

          <h3>Оплата</h3>
          <FormRadio name="payment" value="cash" checked={formData.payment === "cash"} onChange={handleChange} title="У віділенні" />
          <FormRadio name="payment" value="card" checked={formData.payment === "card"} onChange={handleChange} title="Карткою" />

          {loading && <Loader />}
          <div className="mb-12"></div>

          <button type="submit" className="btn-primary btn_hover" disabled={!hasCartItems}>
            {formData.payment === "cash" ? "Оплатити у віділенні" : "Оплатити через LiqPay"}
          </button>

          {/* Succes message and Error */}
          {successMessage && <p className="text-green-600">{successMessage}</p>}
          {error && <p className="text-red-600">{String(error)}</p>}
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
