import React, { useState, useRef } from "react";
import { TextField, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import appTheme from "../../styles/theme";

const AppTextArea = ({
  placeholder,
  value,
  onChange,
  error,
  errorMessage,
  instructions,
  rows = 3,
}) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [selected, setSelected] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const textAreaRef = useRef(null);

  const handleFocus = () => {
    setSelected(true);
    setShowTooltip(true);
  };

  const handleBlur = () => {
    setSelected(false);
    setShowTooltip(false);
  };

  return (
    <>
      <Tooltip
        title={instructions || ""}
        open={!!(showTooltip && error && instructions)}
        placement="left"
        arrow
      >
        <TextField
          multiline
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          inputRef={textAreaRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          error={!!error}
          helperText={error ? errorMessage : ""}
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: theme.colors.inputBackground,
            color: theme.colors.textLight,
            "& .MuiOutlinedInput-root": {
              borderRadius: theme.input.borderRadius,
              fontFamily: theme.fontFamily,
              "& fieldset": {
                borderColor: error
                  ? theme.colors.error
                  : selected
                  ? theme.colors.inputBorderSelected
                  : theme.colors.inputBorder,
              },
            },
            "& .MuiFormHelperText-root": {
              margin: "5px 0 0 0",
              color: theme.colors.error,
            },
          }}
        />
      </Tooltip>
    </>
  );
};

export default AppTextArea;
