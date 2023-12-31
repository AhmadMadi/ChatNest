import { forwardRef } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const Alert = (incomingProps) => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar
      open={incomingProps.isOpen}
      autoHideDuration={4000}
      onClose={incomingProps.onAlertClose}
    >
      <Alert severity={incomingProps.type}>{incomingProps.message}</Alert>
    </Snackbar>
  );
};

export default Alert;
