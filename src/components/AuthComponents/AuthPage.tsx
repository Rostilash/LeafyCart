import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxTypeHook";
import { useEffect } from "react";
import AuthForm from "./AuthForm";
import Tabs from "../Tabs";

const AuthPage: React.FC = () => {
  const { user: currentUser, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/");
    }
  }, [currentUser, loading, navigate]);

  return (
    <div className="p-2 min-h-1/2 m-auto flex justify-center items-center ">
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
