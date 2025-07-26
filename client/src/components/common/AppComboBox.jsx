import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MenuItem,
  FormControl,
  Box,
  Chip,
  Select,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import appTheme from "../../styles/theme";

const AppComboBox = ({
  name,
  value,
  onChange,
  options = [],
  defaultOption,
  multiple = false,
}) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [selected, setSelected] = useState(false);

  const handleFocus = () => setSelected(true);
  const handleBlur = () => setSelected(false);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{
        mb: 3,
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.colors.inputBackground,
          color: theme.colors.textLight,
          borderColor: selected
            ? theme.colors.inputBorderSelected
            : theme.colors.inputBorder,
          borderRadius: theme.input.borderRadius,
          fontFamily: theme.fontFamily,
        },
        "& .MuiInputLabel-root": {
          color: theme.colors.textLight,
          fontFamily: theme.fontFamily,
        },
      }}
    >
      <InputLabel>{name}</InputLabel>
      <Select
        multiple={multiple}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label={name}
        input={<OutlinedInput label={name} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                sx={{
                  backgroundColor: theme.colors.innerCardBackground,
                  color: theme.colors.textLight,
                  borderColor: theme.colors.inputBorder,
                  borderRadius: theme.input.borderRadius,
                }}
              />
            ))}
          </Box>
        )}
        sx={{
          backgroundColor: theme.colors.inputBackground,
          color: theme.colors.textLight,
          borderColor: selected
            ? theme.colors.inputBorderSelected
            : theme.colors.inputBorder,
          borderRadius: theme.input.borderRadius,
          fontFamily: theme.fontFamily,
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.textLight,
              fontFamily: theme.fontFamily,
            },
          },
        }}
      >
        {defaultOption && <MenuItem value="">{defaultOption}</MenuItem>}
        {options.map((option, index) => {
          const isSelected = multiple
            ? value.includes(option)
            : value === option;
          return (
            <MenuItem
              key={index}
              value={option}
              sx={
                isSelected
                  ? {
                      backgroundColor:
                        theme.colors.innerCardBackground + " !important",
                      color: theme.colors.textLight,
                      fontFamily: theme.fontFamily,
                      "&:hover": {
                        backgroundColor:
                          theme.colors.innerCardBackground + " !important",
                      },
                    }
                  : {}
              }
            >
              {option}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText sx={{ color: theme.colors.textLight }}>
        Hold CTRL (Windows) or CMD (Mac) to select multiple
      </FormHelperText>
    </FormControl>
  );
};

export default AppComboBox;
