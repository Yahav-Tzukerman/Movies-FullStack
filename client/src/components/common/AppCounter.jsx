import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Overlay, Tooltip, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import appTheme from "../../styles/theme";
import AppButton from "../common/AppButton";

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

  // Update internal state whenever 'counter' prop changes
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

  // Inline media query to adjust the width on small screens
  const responsiveCountStyle = {
    backgroundColor: theme.colors.inputBackground,
    border: "none",
    textAlign: "center",
    color: theme.colors.textLight,
    fontFamily: theme.fontFamily,
    width: "50px",
    fontSize: "1rem",
  };

  // For extra small screens, let's shrink the width and font size
  const mediaQuery = `
    @media (max-width: 576px) {
      .responsive-counter-input {
        width: 35px !important;
        font-size: 0.875rem !important;
      }
    }
  `;

  return (
    <div className="d-inline-block" ref={countRef}>
      {/* Injecting a <style> tag for the small screen adjustments */}
      <style>{mediaQuery}</style>

      <div className="d-inline-flex align-items-center justify-content-center my-2 mx-1">
        <AppButton
          onClick={handleDecrement}
          label={<FontAwesomeIcon icon={faMinus} />}
          variant="primary"
          size="sm"
        />
        <Form.Control
          readOnly
          value={count}
          style={responsiveCountStyle}
          className="shadow-none responsive-counter-input mx-1"
        />
        <AppButton
          onClick={handleIncrement}
          label={<FontAwesomeIcon icon={faPlus} />}
          variant="primary"
          size="sm"
        />
      </div>

      <Overlay target={countRef.current} show={showTooltip} placement="bottom">
        {(overlayProps) => <Tooltip {...overlayProps}>{instructions}</Tooltip>}
      </Overlay>
    </div>
  );
};

export default AppCounter;
