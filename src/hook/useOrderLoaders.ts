import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/reduxTypeHook";
import { clearSuccessMessage, type OrderFormData } from "../redux/slices/orderSlice";

interface UseOrderLoadersProps {
  initialForm: OrderFormData;
  setFormData: (data: OrderFormData) => void;
  showSnackbar: (message: string, severity?: "success" | "warning" | "error") => void;
}

export const useOrderLoaders = ({ setFormData, showSnackbar, initialForm }: UseOrderLoadersProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { successMessage, error: sending_error } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (successMessage) {
      setFormData(initialForm);
      showSnackbar(successMessage);
      const timeout = setTimeout(() => {
        navigate("/success");
        dispatch(clearSuccessMessage());
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (sending_error) {
      showSnackbar(String(sending_error), "warning");
    }
  }, [sending_error, successMessage, setFormData, showSnackbar, navigate]);

  return {};
};
