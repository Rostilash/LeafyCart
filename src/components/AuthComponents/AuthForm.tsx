import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { registerUser, loginUser, setError, clearError } from "../../redux/slices/authSlice";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataSet({ ...dataSet, [e.target.name]: e.target.value });
  };

  const onUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!passwordRegex.test(dataSet.password)) {
      dispatch(setError("Пароль має містити мінімум 8 символів, 1 велику літеру, 1 цифру та 1 спецсимвол"));
      return;
    }

    const action = mode === "register" ? registerUser : loginUser;

    const result = await dispatch(action(dataSet));

    if (result.type.endsWith("/rejected")) {
      dispatch(setError("Помилка"));
    } else {
      setDataSet({ email: "", password: "" });
      dispatch(clearError());
    }
  };

  return (
    <form onSubmit={onUserSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-center">{title}</h2>

      <input type="email" name="email" placeholder="Email..." value={dataSet.email} onChange={handleChange} className="border p-2 rounded" required />

      <input
        type="password"
        name="password"
        placeholder="Password..."
        value={dataSet.password}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <button type="submit" disabled={loading || dataSet?.email.length < 1} className="btn-primary btn_hover">
        {loading ? "Завантаження..." : mode === "register" ? "Зареєструватися" : "Увійти"}
      </button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
};

export default AuthForm;
