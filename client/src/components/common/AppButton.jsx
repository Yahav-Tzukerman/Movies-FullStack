import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";
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

  const btnSizeClass = size === "sm" ? "btn-sm" : "";

  return (
    <BootstrapButton
      onClick={onClick}
      onMouseEnter={(e) => (e.target.style.backgroundColor = hoverColor)}
      onMouseLeave={(e) => (e.target.style.backgroundColor = backgroundColor)}
      disabled={disabled}
      style={{
        color: theme.colors.buttonText,
        backgroundColor: backgroundColor,
        borderColor:
          variant === "primary" ? theme.colors.primary : theme.colors.textMuted,
        borderRadius: theme.button.borderRadius,
        padding: size === "sm" ? "0.25rem 0.5rem" : theme.button.padding,
        fontSize: size === "sm" ? "0.875rem" : "1rem",
        fontFamily: theme.fontFamily,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className={`shadow-none ${btnSizeClass}`}
    >
      {label}
    </BootstrapButton>
  );
};

export default AppButton;
