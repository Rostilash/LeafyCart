import { useAppSelector } from "../../redux/reduxTypeHook";
import { Navigate, Outlet } from "react-router-dom";

export const AdminWrapper = () => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
