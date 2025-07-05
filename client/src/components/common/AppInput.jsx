import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef } from "react";
import { Form, InputGroup, Overlay, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
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
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef(null);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

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
      <Form.Group className="mb-3">
        <InputGroup>
          <Form.Control
            type={type === "password" && showPassword ? "text" : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.textLight,
              borderColor: error
                ? theme.colors.error
                : selected
                ? theme.colors.inputBorderSelected
                : theme.colors.inputBorder,
              borderRadius: theme.input.borderRadius,
              height: theme.input.height,
              fontFamily: theme.fontFamily,
            }}
            className="shadow-none"
          />
          {type === "password" && (
            <InputGroup.Text
              onClick={handleTogglePassword}
              style={{
                cursor: "pointer",
                backgroundColor: theme.colors.background,
                borderColor: error
                  ? theme.colors.error
                  : selected
                  ? theme.colors.inputBorderSelected
                  : theme.colors.inputBorder,
              }}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </InputGroup.Text>
          )}
        </InputGroup>
        {error && (
          <Form.Text style={{ margin: "5px", color: theme.colors.error }}>
            {errorMessage}
          </Form.Text>
        )}
      </Form.Group>
      {instructions && (
        <Overlay
          target={inputRef.current}
          show={showTooltip && error}
          placement="left"
        >
          {(overlayProps) => (
            <Tooltip {...overlayProps} bsPrefix="tooltip">
              {instructions}
            </Tooltip>
          )}
        </Overlay>
      )}
    </>
  );
};

export default AppInput;
