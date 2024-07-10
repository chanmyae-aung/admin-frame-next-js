import { Alert } from "@mui/material";
import MSnackbar, {
  SnackbarProps as MSnackbarProps
} from "@mui/material/Snackbar";
import React from "react";
import { SlideTransitions } from "../utils";
import { SEVERITY } from "./SnackbarContext";

interface SnackbarProps extends MSnackbarProps {
  message: string;
  severity: SEVERITY;
  open: boolean;
  handleClose?: () => void;
}
const Snackbar: React.FC<SnackbarProps> = ({
  open,
  handleClose,
  severity,
  message,
  ...rest
}) => {
  return (
    <MSnackbar
      open={open}
      autoHideDuration={6000}
      TransitionComponent={SlideTransitions}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      onClose={handleClose}
      {...rest}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MSnackbar>
  );
};

export default Snackbar;
