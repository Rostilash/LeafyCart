import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { getOrdersByUser, processLiqPay, saveOrder, type OrderFormData } from "../../redux/slices/orderSlice";
import AuthPage from "../../components/AuthComponents/AuthPage";
import { CheckoutForm } from "./components/CheckoutForm";
import { CheckoutSummary } from "./components/CheckoutSummary";
import { formatPhone, validateOrderForm } from "../../utils/validateOrderForm";
import { useSnackbar } from "../../hook/useSnackbarReturn";
import { AppSnackbar } from "../../components/AppSnackbar";
import { useOrderLoaders } from "../../hook/useOrderLoaders";

type ConfirmBuyoutInfoProps = {
  totalPrice: number;
  totalDiscount?: number;
};

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

  const userId = useAppSelector((state) => state.auth.user?.uid);
  const { user_orders } = useAppSelector((state) => state.order);

  const cartItems = useAppSelector((state) => state.cart.items);

  const [formData, setFormData] = useState<OrderFormData>(initialForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  // Custum hook for popup message
  const { open, message, severity, showSnackbar, handleClose } = useSnackbar();

  // Watching for success or error message to redireact on success page.
  useOrderLoaders({ setFormData, showSnackbar, initialForm });

  // Get the last order from FB and set into formData if user is log in
  useEffect(() => {
    if (user_orders && user_orders.length > 0) {
      const lastOrder = user_orders.at(-1);
      if (!lastOrder) return;
      setFormData((prev) => {
        const isEqual = Object.keys(lastOrder ?? {}).every((key) => prev[key as keyof typeof prev] === lastOrder[key as keyof typeof lastOrder]);
        if (isEqual) return prev;
        return { ...lastOrder };
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phone_number" ? formatPhone(value) : value,
    });
  };

  const discount = (totalDiscount ?? 0) / 100;
  const delivery = 0;
  const totalSummary = totalPrice / 100 - discount + delivery;

  const handleLiqPay = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if there an errors will return
    const { valid, errors } = validateOrderForm(formData);
    setFormErrors(errors);
    if (!valid) return;

    // Choose the payment for sending.
    if (formData.payment === "liqpay") {
      dispatch(processLiqPay({ formData, cartItems, totalSummary }));
    } else if (formData.payment === "cod") {
      dispatch(
        saveOrder({
          ...formData,
          cartItems,
          price: totalSummary,
          paymentStatus: "pending",
        })
      );
    }
  };

  const hasCartItems = cartItems.length > 0;

  return (
    <>
      {!userId && (
        <div className="max-w-140 " data-testid="auth-page">
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
          errors={formErrors}
        />

        {/* Right side */}
        <CheckoutSummary delivery={delivery} discount={discount} totalPrice={totalPrice} totalSummary={totalSummary} />

        {/* Initial state message (error&succes) */}
        <AppSnackbar open={open} message={message} severity={severity} onClose={handleClose} />
      </div>
    </>
  );
};
