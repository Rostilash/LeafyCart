import { useState, useCallback } from "react";

interface UseSnackbarReturn {
  open: boolean;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  showSnackbar: (message: string, severity?: "success" | "info" | "warning" | "error") => void;
  handleClose: (_?: React.SyntheticEvent | Event, reason?: string) => void;
}

export const useSnackbar = (): UseSnackbarReturn => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("success");

  const showSnackbar = useCallback((msg: string, sev: "success" | "info" | "warning" | "error" = "success") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const handleClose = useCallback((_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  }, []);

  return { open, message, severity, showSnackbar, handleClose };
};
