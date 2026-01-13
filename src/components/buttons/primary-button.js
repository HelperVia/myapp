import Button from "@mui/material/Button";
import React from "react";

export const PrimaryButton = ({ children, onClick, loading }) => {
  return (
    <Button
      color="brandOrange"
      variant="contained"
      fullWidth
      onClick={onClick}
      loading={loading}
    >
      {children}
    </Button>
  );
};
