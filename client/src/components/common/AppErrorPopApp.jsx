// AppErrorPopApp.jsx
import React from "react";
import { Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
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
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1050, // Ensure it's above other elements
      }}
    >
      <Toast
        show={show}
        onClose={handleClose}
        delay={4000}
        autohide
        style={{
          backgroundColor: variantColor,
          color: "white",
          minWidth: "300px",
        }}
      >
        <Toast.Header
          style={{
            backgroundColor: variantColor,
            color: "white",
          }}
        >
          <strong className="me-auto">
            {variant === "error"
              ? "Error"
              : variant === "warning"
              ? "Warning"
              : "Success"}
          </strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>
          <span
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {label}
          </span>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default AppErrorPopApp;
