import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, FormControlLabel, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import appTheme from "../../styles/theme";

const AppThemeToggle = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

  const handleThemeToggle = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <Box
      sx={{
        ml: "auto",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={app.darkMode}
            onChange={handleThemeToggle}
            color="default"
          />
        }
        label=""
        sx={{ pr: "1.2rem" }}
      />
      <Box
        sx={{
          position: "absolute",
          right: "0.4rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: theme.colors.textLight,
        }}
      >
        <FontAwesomeIcon
          icon={faSun}
          style={{
            visibility: app.darkMode ? "hidden" : "visible",
            cursor: "pointer",
          }}
          onClick={handleThemeToggle}
        />
        <FontAwesomeIcon
          icon={faMoon}
          style={{
            visibility: app.darkMode ? "visible" : "hidden",
            cursor: "pointer",
          }}
          onClick={handleThemeToggle}
        />
      </Box>
    </Box>
  );
};

export default AppThemeToggle;
