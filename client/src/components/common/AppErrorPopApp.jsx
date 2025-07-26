// AppErrorPopApp.jsx
import React from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import appTheme from "../../styles/theme";

const AppErrorPopApp = ({
  handleClose = () => {},
  label = "Something went wrong! Please try again later.",
  show = false,
  variant = "error",
}) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const variantColor =
    variant === "error"
      ? theme.colors.error
      : variant === "warning"
      ? theme.colors.warning
      : theme.colors.success;

  return (
    <Snackbar
      open={show}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={variant}
        sx={{
          backgroundColor: variantColor,
          color: "white",
          minWidth: "300px",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        {label}
      </MuiAlert>
    </Snackbar>
  );
};

export default AppErrorPopApp;
