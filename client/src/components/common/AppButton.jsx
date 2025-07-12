import React from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import appTheme from "../../styles/theme";

const AppButton = ({ label, onClick, disabled, variant = "primary", size }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

  const backgroundColor =
    variant === "primary"
      ? theme.colors.primary
      : variant === "error"
      ? theme.colors.error
      : variant === "warning"
      ? theme.colors.warning
      : variant === "update"
      ? theme.colors.update
      : variant === "success"
      ? theme.colors.success
      : theme.colors.textMuted;

  const hoverColor =
    variant === "primary"
      ? theme.colors.hover
      : variant === "error"
      ? theme.colors.errorHover
      : variant === "warning"
      ? theme.colors.warningHover
      : variant === "update"
      ? theme.colors.updateHover
      : variant === "success"
      ? theme.colors.successHover
      : theme.colors.textMuted;

  const btnSize =
    size === "sm"
      ? { padding: "0.25rem 0.5rem", fontSize: "0.875rem" }
      : { padding: theme.button.padding, fontSize: "1rem" };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{
        color: theme.colors.buttonText,
        backgroundColor: backgroundColor,
        borderColor:
          variant === "primary" ? theme.colors.primary : theme.colors.textMuted,
        borderRadius: theme.button.borderRadius,
        fontFamily: theme.fontFamily,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: "none",
        ...btnSize,
        "&:hover": {
          backgroundColor: hoverColor,
          boxShadow: "none",
        },
      }}
      variant="contained"
    >
      {label}
    </Button>
  );
};

export default AppButton;
