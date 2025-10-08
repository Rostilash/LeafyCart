import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { registerUser, loginUser, setError, clearError } from "../../redux/slices/authSlice";
import { validateEmail, validatePassword } from "../../utils/validateOrderForm";
import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { FormField } from "../../pages/Admin/Products/FormSlices/FormField";

interface AuthFormProps {
  mode: "register" | "login";
  title: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, title }) => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);

  const [dataSet, setDataSet] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDataSet({ ...dataSet, [e.target.name]: e.target.value });
  };

  const onUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearError());

    // --------------- Validation  ----------------
    const newErrors: { email?: string; password?: string } = {};
    const emailError = validateEmail(dataSet.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(dataSet.password, { strict: mode === "register" });
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    // ---------------end  Validation  ----------------

    // --------Choosing which dispatch we will dispatch-------
    const action = mode === "register" ? registerUser : loginUser;
    dispatch(action(dataSet))
      .unwrap()
      .then(() => {
        setDataSet({ email: "", password: "" });
        setErrors({});
      })
      .catch((err: string) => {
        setErrors((prev) => ({ ...prev, email: err }));
      });
  };

  return (
    <form onSubmit={onUserSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-center">{title}</h2>

      <FormField
        value={dataSet.email}
        onChange={handleChange}
        error={errors.email}
        name="email"
        title="Eмейл"
        required={false}
        inputType="email"
        className={errors.email ? " border-b-2 border-b-red-500" : "border-b-gray-300"}
      />

      <FormField
        value={dataSet.password}
        onChange={handleChange}
        error={errors.password}
        name="password"
        title="Пароль"
        required={false}
        inputType="password"
      />

      <button type="submit" disabled={loading || dataSet?.email.length < 1} className="btn-primary btn_hover">
        {loading ? "Завантаження..." : mode === "register" ? "Зареєструватися" : "Увійти"}
      </button>

      {mode === "register" && dataSet.password.length > 0 && <PasswordStrengthBar password={dataSet.password || ""} className="absolute" />}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
};

export default AuthForm;
