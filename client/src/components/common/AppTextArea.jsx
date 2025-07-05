import React, { useState, useRef } from "react";
import { Form, Overlay, Tooltip } from "react-bootstrap";
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
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={textAreaRef}
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
            fontFamily: theme.fontFamily,
          }}
          className="shadow-none"
        />
        {error && (
          <Form.Text style={{ margin: "5px", color: theme.colors.error }}>
            {errorMessage}
          </Form.Text>
        )}
      </Form.Group>
      {instructions && (
        <Overlay
          target={textAreaRef.current}
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

export default AppTextArea;
