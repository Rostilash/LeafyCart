import AuthForm from "./AuthForm";

const Login = () => {
  return (
    <div className="p-4 bg-[var(--leafy-bg)] h-screen">
      <AuthForm mode="login" title="Увійти" />
    </div>
  );
};

export default Login;
