import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { registerUser, loginUser } from "../../redux/slices/authSlice";

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

    if (dataSet.password.length < 6) {
      alert("Пароль має бути не менше 6 символів");
      return;
    }

    const action = mode === "register" ? registerUser : loginUser;

    const result = await dispatch(action(dataSet));

    if (action.rejected.match(result)) {
      // console.error("Помилка:", result.payload);
    } else {
      // console.log("Успішно:", result.payload);
    }
  };

  return (
    <form onSubmit={onUserSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-center">{title}</h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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

      <button type="submit" disabled={loading} className="btn-primary btn_hover">
        {loading ? "Завантаження..." : mode === "register" ? "Зареєструватися" : "Увійти"}
      </button>
    </form>
  );
};

export default AuthForm;
