import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { useEffect } from "react";
import AuthForm from "./AuthForm";
import Tabs from "../Tabs";
import { Button } from "@mui/material";
import { loginWithGoogle } from "../../redux/slices/authSlice";

const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user: currentUser, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/");
    }
  }, [currentUser, loading, navigate]);

  return (
    <div className="p-2 min-h-1/2 m-auto flex flex-col justify-center items-center ">
      <span className="text-xs text-gray-400">Можна увійти за допомогою Google</span>
      <Button
        onClick={() => dispatch(loginWithGoogle())}
        variant="outlined"
        color="success"
        className="flex items-center gap-2 "
        sx={{ marginBottom: "20px" }}
      >
        Увійти через Google
        <img src="https://cdn-icons-png.flaticon.com/128/2875/2875404.png" alt="google" className="w-5 h-5 " />
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-2 mb-4 w-full max-w-md">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-400 text-sm">або</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="w-full max-w-md">
        <Tabs
          defaultTab="login"
          tabs={[
            { label: "Увійти", value: "login", content: <AuthForm mode="login" title="Увійти" /> },
            { label: "Зареєструватися", value: "register", content: <AuthForm mode="register" title="Зареєструватися" /> },
          ]}
        />
      </div>
    </div>
  );
};

export default AuthPage;
