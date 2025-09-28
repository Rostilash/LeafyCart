import { useEffect } from "react";
import { clearSuccessMessage, subscribeNewOrders, unsubscribeNewOrders } from "../../../redux/slices/orderSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypeHook";
import { AppSnackbar } from "../../../components/AppSnackbar";

export const OrdersListener = () => {
  const dispatch = useAppDispatch();
  const { successMessage } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(subscribeNewOrders());
    return () => unsubscribeNewOrders();
  }, [dispatch]);

  return <AppSnackbar open={!!successMessage} message={successMessage || ""} severity="info" onClose={() => dispatch(clearSuccessMessage())} />;
};
