import React, { createContext, useState, useContext, ReactNode } from "react";
import Snackbar from "./Snackbar";

export enum SEVERITY {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info"
}
type ShowMessage = {
  message: string;
  severity: SEVERITY;
};
interface SnackbarContextType {
  showMessage: ({ message, severity }: ShowMessage) => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: SEVERITY;
    open: boolean;
  }>({
    message: "",
    severity: SEVERITY.SUCCESS,
    open: false
  });

  const showMessage = ({ message, severity }: ShowMessage) => {
    setSnackbar({ message, severity, open: true });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        handleClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
