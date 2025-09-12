import { Snackbar, Alert } from "@mui/material";
import React from "react";

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  onClose: (_?: React.SyntheticEvent | Event, reason?: string) => void;
  autoHideDuration?: number;
}

export const AppSnackbar: React.FC<AppSnackbarProps> = ({ open, message, severity = "success", onClose, autoHideDuration = 2000 }) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
