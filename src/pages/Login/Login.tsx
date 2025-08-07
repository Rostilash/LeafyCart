import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { useAppSelector } from "../../redux/reduxTypeHook";
import { useEffect } from "react";

const Login = () => {
  const { user: currentUser, loading } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/");
    }
  }, [currentUser, loading, navigate]);

  return (
    <div className="p-4 bg-[var(--leafy-bg)] h-screen">
      <AuthForm mode="login" />
    </div>
  );
};

export default Login;
