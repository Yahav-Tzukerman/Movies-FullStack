import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useSelector } from "react-redux";
import appTheme from "../../styles/theme";

const AppCheckbox = ({ label, id, checked, onChange }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;

  return (
    <FormGroup sx={{ m: 0.5 }}>
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            checked={checked}
            onChange={onChange}
            sx={{
              color: theme.colors.textLight,
              "&.Mui-checked": {
                color: theme.colors.textLight,
              },
              boxShadow: "none",
            }}
          />
        }
        label={label}
        sx={{
          color: theme.colors.textLight,
          fontFamily: theme.fontFamily,
          fontSize: "0.9rem",
          ml: 0.5,
        }}
      />
    </FormGroup>
  );
};

export default AppCheckbox;
