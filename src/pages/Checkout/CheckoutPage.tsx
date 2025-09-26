import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { getOrdersByUser, processLiqPay, saveOrder, type OrderFormData } from "../../redux/slices/orderSlice";
import AuthPage from "../../components/AuthComponents/AuthPage";
import { CheckoutForm } from "./components/CheckoutForm";
import { CheckoutSummary } from "./components/CheckoutSummary";
import { clearCart } from "../../redux/slices/cartSlice";
import { validateOrderForm } from "../../utils/validateOrderForm";
import { useNavigate } from "react-router-dom";

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
  warehouse: "",
  city: "",
  cityRef: "",
  payment: "",
  last_name: "",
  mid_name: "",
  phone_number: "",
};

export const CheckoutPage = ({ totalPrice, totalDiscount }: ConfirmBuyoutInfoProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { successMessage } = useAppSelector((state) => state.order);
  const userId = useAppSelector((state) => state.auth.user?.uid);
  const cartItems = useAppSelector((state) => state.cart.items);
  const { user_orders } = useAppSelector((state) => state.order);
  const [formData, setFormData] = useState<OrderFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  // Watching for success message to redireact on success page.
  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        navigate("/success");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, navigate]);

  // Get the last order from FB and set into formData if user is log in
  useEffect(() => {
    if (user_orders && user_orders.length > 0) {
      const lastOrder = user_orders.at(-1);
      setFormData({
        name: lastOrder?.name || "",
        email: lastOrder?.email || "",
        warehouse: lastOrder?.warehouse || "",
        city: lastOrder?.city || "",
        cityRef: lastOrder?.cityRef || "",
        payment: lastOrder?.payment || "",
        last_name: lastOrder?.last_name || "",
        mid_name: lastOrder?.mid_name || "",
        phone_number: lastOrder?.phone_number || "",
      });
    }
  }, [user_orders]);

  // We getting orders for current user if he log in and after we can get values for inputs
  useEffect(() => {
    if (userId) {
      dispatch(getOrdersByUser(userId));
    }
  }, [dispatch, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    if (name === "phone_number") {
      value = value.replace(/\D/g, "");
      if (value.length > 9) value = value.slice(0, 9);
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  const discount = (totalDiscount ?? 0) / 100;
  const delivery = 0;
  const totalSummary = totalPrice / 100 - discount + delivery;

  const handleLiqPay = async (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors } = validateOrderForm(formData);
    setErrors(errors);

    // Check if there an errors will return
    if (!valid) return;

    // Choose the payment for sending.
    if (formData.payment === "liqpay") {
      dispatch(processLiqPay({ formData, cartItems, totalSummary }));
      console.log("Liqpay order sended!");
    } else if (formData.payment === "cod") {
      dispatch(
        saveOrder({
          ...formData,
          cartItems,
          price: totalSummary,
          paymentStatus: "pending",
        })
      );
      console.log("Cod order sended!");
    }
    setFormData(initialForm);
    dispatch(clearCart());
  };

  const hasCartItems = cartItems.length > 0;

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
            mx-auto min-h-[screen] lg:min-h-0
            grid grid-cols-1 lg:grid-cols-2 gap-8
            overflow-y-auto lg:overflow-visible
            p-2 sm:pt-10 md:px-10
          "
      >
        {/* Left side */}
        <CheckoutForm
          handleChange={handleChange}
          handleLiqPay={handleLiqPay}
          setFormData={setFormData}
          formData={formData}
          hasCartItems={hasCartItems}
          errors={errors}
        />

        {/* Right side */}
        <CheckoutSummary delivery={delivery} discount={discount} totalPrice={totalPrice} totalSummary={totalSummary} />
      </div>
    </>
  );
};
