import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { getOrdersByUser } from "../../redux/slices/orderSlice";
import { AboutUser } from "./components/AboutUser";
import { UserOrders } from "./components/UserOrders";
import Tabs from "../../components/Tabs";
import { changeUserPassword } from "../../redux/slices/authSlice";
import { FormField } from "../Admin/Products/FormSlices/FormField";

export const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [changePassword, setChangePassword] = useState({ oldPassword: "", newPassword: "" });
  const [errors, setErrors] = useState({ oldPassword: "", newPassword: "" });
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setChangePassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { oldPassword: "", newPassword: "" };

    if (changePassword.oldPassword.length < 6) newErrors.oldPassword = "Має бути більше ніж 6 символів";
    if (changePassword.newPassword.length < 6) newErrors.newPassword = "Має бути більше ніж 6 символів";

    if (!changePassword.oldPassword) newErrors.oldPassword = "Поле не має бути пустим";
    if (!changePassword.newPassword) newErrors.newPassword = "Поле не має бути пустим";

    if (changePassword.oldPassword === changePassword.newPassword) {
      newErrors.oldPassword = "Однакові паролі";
      newErrors.newPassword = "Однакові паролі";
    }

    setErrors(newErrors);

    if (!newErrors.oldPassword && !newErrors.newPassword) {
      const res = await dispatch(
        changeUserPassword({
          oldPassword: changePassword.oldPassword,
          newPassword: changePassword.newPassword,
        })
      ).unwrap();
      setSuccess(res);
      setChangePassword({ oldPassword: "", newPassword: "" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleClick} className="flex flex-col space-y-2">
        <FormField
          value={changePassword.oldPassword}
          onChange={handleChange}
          error={errors.oldPassword}
          name="oldPassword"
          title="Старий пароль"
          required={false}
          inputType="text"
        />

        <FormField
          value={changePassword.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          name="newPassword"
          title="Новий пароль"
          required={false}
          inputType="text"
        />

        <button type="submit">Змінити</button>
      </form>
      {success && <p className="text-green-200">{success}</p>}
    </div>
  );
};

export const PersonalInfo = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.uid);
  const user_orders = useAppSelector((state) => state.order.user_orders);

  useEffect(() => {
    if (userId) {
      dispatch(getOrdersByUser(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="w-full">
      <Tabs
        defaultTab="orders"
        tabs={[
          {
            label: "Замовлення",
            value: "orders",
            content: (
              <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-16">
                <title>Особистий кабінет</title>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* User Info */}
                  <AboutUser />

                  {/* Orders */}
                  <UserOrders orders={user_orders} />
                </div>
              </div>
            ),
          },
          { label: "Змінити пароль", value: "register", content: <ChangePassword /> },
        ]}
      />
    </div>
  );
};
