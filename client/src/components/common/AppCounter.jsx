import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tooltip, IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import appTheme from "../../styles/theme";
import AppButton from "../common/AppButton"; // If you want to keep your custom button, otherwise use MUI's IconButton

const AppCounter = ({
  counter = 0,
  onChange,
  instructions = "Counter must be greater than or equal to 0.",
}) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

  const [count, setCount] = useState(counter);
  const [showTooltip, setShowTooltip] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    setCount(counter);
  }, [counter]);

  const handleDecrement = () => {
    if (count > 0) {
      const newValue = count - 1;
      setCount(newValue);
      onChange && onChange(newValue);
    } else {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    }
  };

  const handleIncrement = () => {
    const newValue = count + 1;
    setCount(newValue);
    onChange && onChange(newValue);
  };

  // Responsive styles for MUI TextField
  const responsiveCountStyle = {
    backgroundColor: theme.colors.inputBackground,
    border: "none",
    textAlign: "center",
    color: theme.colors.textLight,
    fontFamily: theme.fontFamily,
    width: "50px",
    fontSize: "1rem",
  };

  return (
    <div ref={countRef} style={{ display: "inline-block" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0.5rem 0.25rem",
        }}
      >
        <Tooltip
          title={count === 0 ? instructions : ""}
          open={showTooltip}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          placement="bottom"
        >
          <span>
            <IconButton
              onClick={handleDecrement}
              color="primary"
              size="small"
              disabled={count === 0}
              sx={{ marginRight: 1 }}
            >
              <Remove />
            </IconButton>
          </span>
        </Tooltip>
        <TextField
          value={count}
          inputProps={{
            readOnly: true,
            style: responsiveCountStyle,
          }}
          variant="outlined"
          size="small"
          sx={{
            width: { xs: 35, sm: 50 },
            fontSize: { xs: "0.875rem", sm: "1rem" },
            mx: 1,
            "& .MuiInputBase-input": {
              textAlign: "center",
              padding: "6px 0",
            },
          }}
        />
        <IconButton
          onClick={handleIncrement}
          color="primary"
          size="small"
          sx={{ marginLeft: 1 }}
        >
          <Add />
        </IconButton>
      </div>
    </div>
  );
};

export default AppCounter;
