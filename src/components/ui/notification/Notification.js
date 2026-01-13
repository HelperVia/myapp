import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React, { useEffect } from "react";

import { NotifyContext } from "./context/Context";

export const Notification = (props) => {
  const { notify, setNotify } = React.use(NotifyContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      open: false,
    });
  };

  return (
    <React.Fragment>
      {notify.open && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={notify.open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            severity={
              typeof notify.severity !== "undefined"
                ? notify.severity
                : "success"
            }
            variant="filled"
            sx={{ width: "100%" }}
          >
            {typeof notify.message !== "undefined"
              ? notify.message
              : "Hey There !"}
          </Alert>
        </Snackbar>
      )}
    </React.Fragment>
  );
};
