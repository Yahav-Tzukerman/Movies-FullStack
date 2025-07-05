import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import appTheme from "../../styles/theme";

const AppComboBox = ({
  name,
  value,
  onChange,
  options = [],
  defaultOption,
}) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const [selected, setSelected] = useState(false);
  const selectRef = useRef(null);

  const handleFocus = () => {
    setSelected(true);
  };

  const handleBlur = () => {
    setSelected(false);
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Select
          name={name}
          value={value}
          onChange={onChange}
          ref={selectRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            backgroundColor: theme.colors.inputBackground,
            color: theme.colors.textLight,
            borderColor: selected
              ? theme.colors.inputBorderSelected
              : theme.colors.inputBorder,
            borderRadius: theme.input.borderRadius,
            height: theme.input.height,
            fontFamily: theme.fontFamily,
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            paddingRight: "30px",
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23${
              app.darkMode ? "ffffff" : "000000"
            }' d='M7 10l5 5 5-5z'/></svg>")`,
            backgroundPosition: "right 10px center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "16px 16px",
          }}
          className="shadow-none"
        >
          {defaultOption && <option value="">{defaultOption}</option>}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </>
  );
};

export default AppComboBox;
