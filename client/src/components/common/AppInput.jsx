import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import appTheme from "../../styles/theme";

const AppInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  errorMessage,
  instructions,
}) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [selected, setSelected] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFocus = () => {
    setSelected(true);
  };

  const handleBlur = () => {
    setSelected(false);
  };

  return (
    <Tooltip
      title={instructions && error ? instructions : ""}
      open={!!(instructions && error && selected)}
      placement="left"
      arrow
    >
      <TextField
        label={placeholder}
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={!!error}
        helperText={error ? errorMessage : ""}
        variant="outlined"
        fullWidth
        InputLabelProps={{ style: { color: theme.colors.textLight } }}
        InputProps={{
          style: {
            backgroundColor: theme.colors.inputBackground,
            color: theme.colors.textLight,
            borderRadius: theme.input.borderRadius,
            fontFamily: theme.fontFamily,
          },
          endAdornment:
            type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  style={{
                    color: theme.colors.textLight,
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: error
                ? theme.colors.error
                : selected
                ? theme.colors.inputBorderSelected
                : theme.colors.inputBorder,
            },
            "&:hover fieldset": {
              // borderColor: theme.colors.inputBorderSelected,
            },
          },
          mb: 2,
        }}
      />
    </Tooltip>
  );
};

export default AppInput;
