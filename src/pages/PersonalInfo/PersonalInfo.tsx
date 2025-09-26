import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reduxTypeHook";
import { getOrdersByUser } from "../../redux/slices/orderSlice";
import { AboutUser } from "./components/AboutUser";
import { UserOrders } from "./components/UserOrders";

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
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-16">
      <title>Особистий кабінет</title>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Info */}
        <AboutUser />

        {/* Orders */}
        <UserOrders orders={user_orders} />
      </div>
    </div>
  );
};
