import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import appTheme from "../../styles/theme";

const AppLabel = ({ text }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

  return (
    <Typography
      variant="subtitle2"
      sx={{
        fontSize: "0.9rem",
        color: theme.colors.textMuted,
        fontFamily: theme.fontFamily,
        margin: "5px",
      }}
    >
      {text}
    </Typography>
  );
};

export default AppLabel;
